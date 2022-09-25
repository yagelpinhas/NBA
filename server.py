from tkinter.tix import Tree
from fastapi import FastAPI , status ,  HTTPException , Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import requests

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

@app.get('/')
def root():
    return FileResponse('./client/index.html')

def isActive(player):
    return len(player["isActive"])>0

def queryPlayerTeam(team,teamName):
    return team== teamToIDs[teamName] 

@app.get("/playersByYear/")
async def query_params(teamName,year):
    global dreamTeamMode
    dreamTeamMode = False
    global relevant_players
    relevant_players=[]
    
    res = requests.get(f"http://data.nba.net/10s/prod/v1/{year}/players.json")
    year=int(year)
    allplayers = res.json()['league']['standard']
    for player in allplayers:
        for team in player["teamId"].split(" "):
            if queryPlayerTeam(team,teamName)==True:
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



@app.post("/addToDreamTeam/")
async def addToDreamTeam(request: Request):
    res = await request.json()
    dreamTeam.append(res)
    a=5


@app.delete("/removeFromDreamTeam/")
async def removeFromDreamTeam(firstName,lastName):
    index_to_be_removed=-1
    for i in range(0,len(dreamTeam)):
        if dreamTeam[i]["firstName"]==firstName and dreamTeam[i]["lastName"]==lastName:
            index_to_be_removed=i
    dreamTeam.pop(index_to_be_removed)

@app.get("/getDreamTeam/")
async def getDreamTeam():
    global dreamTeamMode
    dreamTeamMode = True
    return dreamTeam

@app.get("/filterActive")
async def filterActive():
    global relevant_players
    global dreamTeam
    global dreamTeamMode
    if (dreamTeamMode == False):
        relevant_players = list(filter(lambda player: (isActive(player)), relevant_players)) 
        return relevant_players
    else:
        dreamTeam = list(filter(lambda player: (isActive(player)), dreamTeam))
        return dreamTeam 

@app.get("/getPlayerStats/")
def getPlayerStats(firstName,lastName):
    res = requests.get(f'https://nba-players.herokuapp.com/players-stats/{lastName}/{firstName}')
    return res.json()

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8041,reload=True)