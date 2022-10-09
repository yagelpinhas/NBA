
const DataManager = function () {
    let players=[]
    const getPlayerStats = async function(firstName,lastName){
        return $.get(`/getPlayerStats?firstName=${firstName}&lastName=${lastName}`)
    }

    const addToDreamTeam = async function (player){
        await $.post("/addToDreamTeam/",JSON.stringify(player));
    }
    const removeFromDreamTeam = async function(firstName,lastName){
        $.ajax({
            url: `/removeFromDreamTeam?firstName=${firstName}&lastName=${lastName}`,
            type: 'DELETE',
            dataType: 'json',
            data: {
                "firstName": firstName,
                "lastName": lastName
            },
            success: function(res) {
                console.log(res);
            },
            error: function(response) {
                console.log(response);
            }
        });

    }
    const getPlayers = function(){
        return players
    }
    const getDreamTeam = function(){
        return $.get(`/getDreamTeam`)
    }

    const filterActive = async function(){
        
        await $.get(`/filterActive`, function (response) {
            players=response
         })
    }

    const setPlayers = async function(teamName,year){
        await $.get(`/playersByYear?teamName=${teamName}&year=${year}`, function (response) {
           players=response
        })
    }
    return {
        getPlayers: getPlayers,
        setPlayers: setPlayers,
        addToDreamTeam: addToDreamTeam,
        getDreamTeam: getDreamTeam,
        removeFromDreamTeam: removeFromDreamTeam,
        filterActive: filterActive,
        getPlayerStats: getPlayerStats
    }
}
