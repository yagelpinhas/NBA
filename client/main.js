//13:41 pm 
const renderer = Renderer()
const module = DataManager()

const fetch = async function () {
    const teamName = $(`#teamNameInput`).val()
    const year = $(`#yearInput`).val()
    await module.setPlayers(teamName,year)
    renderer.render(module.getPlayers())
}

$("body").on("click", ".addDream", async function() {
    let name =  $(this).closest(".player").find(".name").html()
    let firstName = name.split(" ")[0]
    let lastName = name.split(" ")[1] 
    let jersey=  $(this).closest(".player").find(".number").html()
    let pos =  $(this).closest(".player").find(".pos").html()
    let img = $(this).closest(".player").find('.playerimg').attr('src');
    await module.addToDreamTeam({"firstName": firstName, "lastName": lastName, "jersey": jersey, "pos": pos, "img": img})
  });

  $("body").on("click", ".retrieve", async function() {
    dreamTeam = await module.getDreamTeam()
    renderer.renderDreamTeam(dreamTeam)
  });

  
$("body").on("click", ".removeDream", async function() {
  let name =  $(this).closest(".player").find(".name").html()
  let firstName = name.split(" ")[0]
  let lastName = name.split(" ")[1]
  module.removeFromDreamTeam(firstName,lastName)
  dreamTeam = await module.getDreamTeam()
  renderer.renderDreamTeam(dreamTeam)
});

$("body").on("click", ".filterActive", async function() {
  await module.filterActive(renderer.getDreamMode())
  if (renderer.getDreamMode()){
    renderer.renderDreamTeam(module.getPlayers())
  }
  else{
    renderer.render(module.getPlayers())
  }
});

$("body").on("click",".stats", async function(){
  let player = $(this).closest(".player")
  let name =  $(this).closest(".player").find(".name").html()
  let firstName = name.split(" ")[0]
  let lastName = name.split(" ")[1]
  stats = await module.getPlayerStats(firstName,lastName)
  renderer.renderStats(stats,player)
})


