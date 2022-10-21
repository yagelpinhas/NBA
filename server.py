from tkinter.tix import Tree
from fastapi import FastAPI , status ,  HTTPException , Request, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import requests
import helper_methods

app = FastAPI()
app.mount("/client", StaticFiles(directory="client"), name="client")

dictionary={}

teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

dreamTeam =[]
relevant_players=[]
dreamTeamMode = False

def filterRelevantTeam(teamID,teamName):
    return teamID==teamToIDs[teamName] 

@app.get('/')
def root():
    return FileResponse('./client/index.html')

@app.get("/players/")
async def query_params(teamName,year, response: Response):
    global dreamTeamMode
    dreamTeamMode = False
    global relevant_players
    relevant_players=[]
    if teamName not in teamToIDs.keys():
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"Error": "invalid team name"}
    if int(year)>3000 or int(year)<1000:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"Error": "invalid year"}       
    res = requests.get(f"http://data.nba.net/10s/prod/v1/{year}/players.json")
    allplayers = res.json()['league']['standard']
    for player in allplayers:
        for team in player["teamId"].split(" "):
            if filterRelevantTeam(team,teamName)==True:
                first_name = player["firstName"]
                last_name = player["lastName"]
                jersey_number = player["jersey"]
                position = player["pos"]
                img = f"https:nba-players.herokuapp.com/players/{last_name}/{first_name}"
                isActive = player["dateOfBirthUTC"]
                
                relevant_players.append({
                    "firstName" : first_name,"lastName"  : last_name,
                    "jersey" : jersey_number,
                    "isActive": isActive,
                    "pos": position,
                    "img": img})
    return relevant_players

@app.post("/dreamteam/")
async def addToDreamTeam(request: Request):
    res = await request.json()
    for player in relevant_players:
        if player["firstName"]==res["firstName"] and player["lastName"]==res["lastName"]:
            dreamTeam.append(player)
            break

@app.delete("/dreamteam/")
async def removeFromDreamTeam(firstName,lastName):
    index_to_be_removed=-1
    for i in range(0,len(dreamTeam)):
        if dreamTeam[i]["firstName"]==firstName and dreamTeam[i]["lastName"]==lastName:
            index_to_be_removed=i
    dreamTeam.pop(index_to_be_removed)

@app.get("/dreamteam/")
async def getDreamTeam():
    global dreamTeamMode
    dreamTeamMode = True
    return dreamTeam

@app.get("/players/filteractive")
async def players_filter_active():
    global relevant_players
    relevant_players = list(filter(lambda player: (helper_methods.isActive(player)), relevant_players))
    print("filtered active from players") 
    return relevant_players

@app.get("/dreamteam/filteractive")
async def players_filter_active():
    global dreamTeam
    dreamTeam = list(filter(lambda player: (helper_methods.isActive(player)), dreamTeam))
    print("filtered active from dream team")
    return dreamTeam

@app.get("/players/stats")
def getPlayerStats(firstName,lastName):
    res = requests.get(f'https://nba-players.herokuapp.com/players-stats/{lastName}/{firstName}')
    return res.json()

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8052,reload=True)