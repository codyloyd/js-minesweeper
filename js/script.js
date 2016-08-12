$(document).ready(function () {
  var gameArray = createGameArray(9)
  generateMines(10, gameArray)
  generateHints(gameArray)
  renderGrid(gameArray)
})

var minesRemaining

$(document).on('contextmenu', '.square', function (e) {
  return false
})

function clickFunction (gameArray) {
  $('.square').mousedown(function (event) {
    switch (event.which) {
      case 1:
        toggleCovered($(this),gameArray)
        break
      case 2:
        break
      case 3:
        toggleFlagged($(this),gameArray)
        break
      default:
    }
  })
}

function toggleFlagged (element,gameArray) {
  var x = element.attr('x')
  var y = element.attr('y')
  if (gameArray[x][y].status === 'flagged') {
    gameArray[x][y].status = 'covered'
  } else {
    gameArray[x][y].status = 'flagged'
  }
  renderGrid(gameArray)
}

function toggleCovered(element,gameArray){
  var x = element.attr('x')
  var y = element.attr('y')
  if (gameArray[x][y].status === 'covered') {
    gameArray[x][y].status = 'uncovered'
    if (gameArray[x][y].value === 0) {
      toggleNeighbors(x,y,gameArray)
    } else if (gameArray[x][y].value === 'X') {
      alert('game over, loser')
    }
    renderGrid(gameArray)
  }
}

function square (val) {
  var value = val
  var status = 'covered'
  return {
    value: value,
    status: status
  }
}
function createGameArray (size) {
  var array = []
  for (var i = 0; i < size; i++) {
    array.push(createArrayRow(size))
  }
  return array
}

function createArrayRow (size) {
  var array = []
  for (var i = 0; i < size; i++) {
    var sq = square(0)
    array.push(sq)
  }
  return array
}

function renderGrid (array) {
  $('.gamecontainer').empty()
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i].length; j++) {
      if (array[i][j].status === 'covered') {
        $('.gamecontainer').append('<div class="square covered" x="' + i + '" y="' + j + '"></div>')
      } else if (array[i][j].status === 'uncovered') {
        $('.gamecontainer').append('<div class="square uncovered" x="' + i + '" y="' + j + '">' + array[i][j].value + '</div>')
      } else if (array[i][j].status === 'flagged') {
        $('.gamecontainer').append('<div class="square flagged" x="' + i + '" y="' + j + '"></div>')
      }
    }
  }
  clickFunction(array)
}

function generateMines (numberOfMines, ary) {
  function rand () {
    return Math.floor(Math.random() * ary.length)
  }
  for (var i = 0; i < numberOfMines; i++) {
    ary[rand()][rand()].value = 'X'
  }
}

function visitNeighbors (i, j, gameArray) {
  var neighbors = [[-1, 0], [0, -1], [1, 0], [0, 1], [1, 1], [1, -1], [-1, 1], [-1, -1]]
  for (var x = 0; x < neighbors.length; x++) {
    if (i + neighbors[x][0] >= 0 && i + neighbors[x][0] <= 8 && j + neighbors[x][1] >= 0 && j + neighbors[x][1] <= 8) {
      if (gameArray[i + neighbors[x][0]][j + neighbors[x][1]].value !== 'X') {
        gameArray[i + neighbors[x][0]][j + neighbors[x][1]].value += 1
      }
    }
  }
}

function toggleNeighbors (i, j, gameArray) {
  var neighbors = [[-1, 0], [0, -1], [1, 0], [0, 1], [1, 1], [1, -1], [-1, 1], [-1, -1]]
  for (var x = 0; x < neighbors.length; x++) {
    var xCoord = Number(i) + neighbors[x][0]
    var yCoord = Number(j) + neighbors[x][1]
    if (xCoord >= 0 && xCoord <= 8 && yCoord >= 0 && yCoord <= 8) {
      // console.log("[x='" + xCoord + "'][y='"+ yCoord + "']")
      toggleCovered($("[x='" + xCoord + "'][y='"+ yCoord + "']"), gameArray)
    }
  }
}

function generateHints (gameArray) {
  for (var i = 0; i < gameArray.length; i++) {
    for (var j = 0; j < gameArray[i].length; j++) {
      if (gameArray[i][j].value === 'X') {
        visitNeighbors(i, j, gameArray)
      }
    }
  }
}
