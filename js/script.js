$(document).ready(function(){
  var gameArray = createGameArray(9)
  renderGrid(gameArray)
})

function createGameArray(size){
  var array = []
  for (var i = 0; i < size; i++) {
    array.push(createArrayRow(size))
  }
  return array
}

function createArrayRow(size){
  var array = []
  for (var i = 0; i < size; i++) {
    array.push(" ")
  }
  return array
}

function renderGrid(array){
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i].length; j++) {
      $(".gamecontainer").append('<div class="square">'+array[i][j]+'</div>')
    }
  }
}
