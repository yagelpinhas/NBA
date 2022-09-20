const source = $(`#roster-template`).html()
const template = Handlebars.compile(source)

const render = function (roster) {
    const newHTML = template({ roster })
    $(`#roster`).empty().append(newHTML)
}

const fetch = function () {
    const teamName = $(`#teamNameInput`).val()
    const year = $(`#yearInput`).val()
    $.get(`/playersByYear?teamName=${teamName}&year=${year}`, function (response) {
        render(response)
    })
}
