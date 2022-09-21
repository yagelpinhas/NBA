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

@app.get('/')
def root():
    return FileResponse('./client/index.html')

def queryPlayerTeam(player,team,teamName,year):
    return team["teamId"] == teamToIDs[teamName] and year>=int(team["seasonStart"]) and year<=int(team["seasonEnd"]) 

@app.get("/playersByYear/")
async def query_params(teamName,year):
    year=int(year)
    res = requests.get('http://data.nba.net/10s/prod/v1/2018/players.json')
    allplayers = res.json()['league']['standard']
    relevant_players=[]
    for player in allplayers:
        for team in player["teams"]:
            if queryPlayerTeam(player,team,teamName,year)==True:
                first_name = player["firstName"]
                last_name = player["lastName"]
                jersey_number = player["jersey"]
                position = player["pos"]
                img = f"https:nba-players.herokuapp.com/players/{last_name}/{first_name}"
                relevant_players.append({
                    "firstName" : first_name,"lastName"  : last_name,
                    "jersey" : jersey_number,
                    "pos": position,
                    "img": img})
    return relevant_players

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8040)