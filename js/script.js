$(document).ready(function () {
  var gameArray = createGameArray(9)
  generateMines(15, gameArray)
  generateHints(gameArray)
  renderGrid(gameArray)
})

function clickFunction (gameArray) {
  $('.square').click(function () {
    var x = $(this).attr('x')
    var y = $(this).attr('y')
    $(this).removeClass('covered')
    $(this).addClass('uncovered')
    gameArray[x][y].status = 'uncovered'
    renderGrid(gameArray)
  })
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

function generateHints (gameArray) {
  var neighbors = [[-1, 0], [0, -1], [1, 0], [0, 1], [1, 1], [1, -1], [-1, 1], [-1, -1]]
  for (var i = 0; i < gameArray.length; i++) {
    for (var j = 0; j < gameArray[i].length; j++) {
      if (gameArray[i][j].value === 'X') {
        for (var x = 0; x < neighbors.length; x++) {
          if (i + neighbors[x][0] >= 0 && i + neighbors[x][0] <= 8 && j + neighbors[x][1] >= 0 && j + neighbors[x][1] <= 8) {
            if (gameArray[i + neighbors[x][0]][j + neighbors[x][1]].value !== 'X') {
              gameArray[i + neighbors[x][0]][j + neighbors[x][1]].value += 1
            }
          }
        }
      }
    }
  }
}
