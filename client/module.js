
const DataManager = function () {
    let nba=[]
    const getPlayerStats = async function(firstName,lastName){
        return $.get(`/players/stats?firstName=${firstName}&lastName=${lastName}`)
    }

    const addToDreamTeam = async function (player){
        await $.post("/dreamteam/",JSON.stringify(player));
    }
    const removeFromDreamTeam = async function(firstName,lastName){
        $.ajax({
            url: `/dreamteam?firstName=${firstName}&lastName=${lastName}`,
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
        return nba
    }
    const getDreamTeam = function(){
        return $.get(`/dreamteam`)
    }

    const filterActive = async function(dreamMode){
        if (dreamMode==false){
            await $.get(`/players/filteractive`, function (response) {
                nba=response
            })
        }
        else{
            await $.get(`/dreamteam/filteractive`, function (response) {
                nba=response
            })
        }
    }

    const setPlayers = async function(teamName,year){
        await $.get(`/players?teamName=${teamName}&year=${year}`, function (response) {
           nba=response
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
