
const DataManager = function () {
    let roster=[]
    let dreamTeam=[]
    const addToDreamTeam = async function (player){
        await $.post("/addToDreamTeam/",JSON.stringify(player));
    }
    const removeFromDreamTeam = async function(firstName,lastName){
        await $.delete(`/removeFromDreamTeam?firstName=${firstName}&lastName=${lastName}`)
    }
    const getPlayers = function(){
        return roster
    }
    const getDreamTeam = function(){
        return $.get(`/getDreamTeam`)
    }

    const filterActive = function(){
        roster=roster.filter(player => player["isActive"]==true)
    }

    const setPlayers = async function(teamName,year){
        await $.get(`/playersByYear?teamName=${teamName}&year=${year}`, function (response) {
           roster=response
        })
    }
    return {
        getPlayers: getPlayers,
        setPlayers: setPlayers,
        addToDreamTeam: addToDreamTeam,
        getDreamTeam: getDreamTeam,
        removeFromDreamTeam: removeFromDreamTeam,
        filterActive: filterActive
    }
}
