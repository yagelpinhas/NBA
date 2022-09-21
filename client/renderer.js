const source = $(`#roster-template`).html()
const template = Handlebars.compile(source)

const sourceDream = $(`#rosterdream-template`).html()
const templateDream  = Handlebars.compile(sourceDream)

const Renderer = function() {
    const render=function(roster){
        const newHTML = template({ roster })
        $(`#roster`).empty().append(newHTML)
    }

    const renderDreamTeam = function(roster){
        const newHTMLDREAM = templateDream({roster})
        $(`#roster`).empty().append(newHTMLDREAM)
    }
    return {
        render: render,
        renderDreamTeam: renderDreamTeam
    }
}