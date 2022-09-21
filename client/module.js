
const DataManager = function () {
    roster=[]
    dreamTeam=[]
    const addToDreamTeam = function (player){
        dreamTeam.push(player)
    }
    const removeFromDreamTeam = function(firstName,lastName){
        index_to_be_removed=-1
        for(let i=0; i <dreamTeam.length;i++){
            if (dreamTeam[i]["firstName"]==firstName && dreamTeam[i]["lastName"]==lastName){
                index_to_be_removed=i
            }
        }
        dreamTeam.splice(index_to_be_removed,1)
    }
    const setPlayers = function(arr){
        roster=arr
    }
    const getPlayers = function(){
        return roster
    }
    const getDreamTeam = function(){
        return dreamTeam
    }

    const filterActive = function(){
        roster=roster.filter(player => player["isActive"]==false)
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
