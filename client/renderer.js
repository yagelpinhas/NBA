const source = $(`#roster-template`).html()
const template = Handlebars.compile(source)

const Renderer = function() {
    const render=function(roster){
        const newHTML = template({ roster })
        $(`#roster`).empty().append(newHTML)
    }
    return {
        render: render
    }
}