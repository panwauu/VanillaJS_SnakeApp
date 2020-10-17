import { update as updateSnake, draw as drawSnake, getSnakeSpeed, getSnakeHead, snakeIntersection, getSnakeLength} from './snake.js'
import { update as updateFood, draw as drawFood} from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')
let gameOver = false

function main(currentTime){
    if (gameOver) {
        let snakeLength = getSnakeLength().toString()
        if (confirm('You lost. Snake-Length: '.concat(snakeLength ,' Press ok to restart!'))) {
          window.location = '/'
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000
    if (secondsSinceLastRender < 1 / getSnakeSpeed()) return

    lastRenderTime = currentTime
    
    update()
    draw()
}


window.requestAnimationFrame(main)

function update(){
    updateFood()
    updateSnake()
    checkEndCondition()
}

function draw(){
    gameBoard.innerHTML=""
    drawFood(gameBoard)
    drawSnake(gameBoard)
}

function checkEndCondition(){
    gameOver = (outsideGrid(getSnakeHead()) || snakeIntersection())
}