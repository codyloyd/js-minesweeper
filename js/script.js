$(document).ready(function(){
  var gameArray = createGameArray(9)
  generateMines(15,gameArray)
  generateHints(gameArray)
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
    array.push(0)
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

function generateMines(numberOfMines,ary){
  function rand() {
    return Math.floor(Math.random()*ary.length)
  }
  for (var i = 0; i < numberOfMines; i++) {
    ary[rand()][rand()] = "X"
  }
}

function generateHints(gameArray){
  var neighbors = [[-1,0],[0,-1],[1,0],[0,1],[1,1],[1,-1],[-1,1],[-1,-1]]
  for (var i = 0; i < gameArray.length; i++) {
    for (var j = 0; j < gameArray[i].length; j++) {
      if (gameArray[i][j] == "X") {
        for (var x = 0; x < neighbors.length; x++) {
          if (i + neighbors[x][0] >= 0 && i + neighbors[x][0] <= 8 && j + neighbors[x][1] >= 0 && j + neighbors[x][1] <= 8 ) {
            if(gameArray[i +neighbors[x][0]][j +neighbors[x][1]] != "X"){
              gameArray[i +neighbors[x][0]][j +neighbors[x][1]] += 1
            }
          }
        }
      }
    }
  }
}
