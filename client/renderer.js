const source = $(`#roster-template`).html()
const template = Handlebars.compile(source)

const sourceDream = $(`#rosterdream-template`).html()
const templateDream  = Handlebars.compile(sourceDream)

const Renderer = function() {
    let dreamMode = false
    const getDreamMode = function(){
        return dreamMode
    }
    const render=function(roster){
        dreamMode = false
        const newHTML = template({ roster })
        $(`#roster`).empty().append(newHTML)
    }

    const renderDreamTeam = function(roster){
        const newHTMLDREAM = templateDream({roster})
        $(`#roster`).empty().append(newHTMLDREAM)
        dreamMode = true
    }

    const renderStats = function(stats,player){
        const sourceStats = $(`.stats-template`).html()
        const templateStats = Handlebars.compile(sourceStats)
        const newHTML = templateStats(stats)
        player.find(".dropup-content").append(newHTML)
    }
    return {
        render: render,
        renderDreamTeam: renderDreamTeam,
        getDreamMode: getDreamMode,
        renderStats: renderStats
    }
}