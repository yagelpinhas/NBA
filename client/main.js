

/*
const source = $(`#roster-template`).html()
const template = Handlebars.compile(source)
*/
const renderer = Renderer()
const module = DataManager()

const fetch = function () {
    const teamName = $(`#teamNameInput`).val()
    const year = $(`#yearInput`).val()
    $.get(`/playersByYear?teamName=${teamName}&year=${year}`, function (response) {
        module.setPlayers(response)
        renderer.render(response)
    })
}


$("body").on("click", ".addDream", function() {
    let name =  $(this).closest(".player").find(".name").html()
    let firstName = name.split(" ")[0]
    let lastName = name.split(" ")[1]
    
    let jersey=  $(this).closest(".player").find(".number").html()
    let pos =  $(this).closest(".player").find(".pos").html()
    let img = $(this).closest(".player").find('.playerimg').attr('src');
    module.addToDreamTeam({"firstName": firstName, "lastName": lastName, "jersey": jersey, "pos": pos, "img": img})

  });

  $("body").on("click", ".retrieve", function() {
    renderer.render(module.getDreamTeam)
    $(".addDream").html("-")
    $(".addDream").toggleClass('removeDream');
    a=5
  });

  
$("body").on("click", ".removeDream", function() {
  let name =  $(this).closest(".player").find(".name").html()
  let firstName = name.split(" ")[0]
  let lastName = name.split(" ")[1]
  module.removeFromDreamTeam(firstName,lastName)
  renderer.render(module.getDreamTeam)
});


