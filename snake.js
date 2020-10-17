import { getInputDirection } from "./input.js"
import { onFood } from './food.js'

var SNAKE_SPEED = parseInt(prompt("Snake Speed","10"))
var EXPANSION_RATE = parseInt(prompt("Expansion Rate","1"))
if(isNaN(SNAKE_SPEED)){SNAKE_SPEED = 1}
if(isNaN(EXPANSION_RATE)){EXPANSION_RATE = 10}

const snakeBody = [{ x:11, y:11 }]
let numberSegments = 1

export function getSnakeSpeed(){
    return SNAKE_SPEED;
}

export function getSnakeLength(){
    return snakeBody.length
}

export function update(){
    const inputDirection = getInputDirection()
    if(inputDirection.x !== 0 || inputDirection.y !== 0){
        let newElement = {x:0, y:0}
        newElement.x = snakeBody[0].x + inputDirection.x
        newElement.y = snakeBody[0].y - inputDirection.y
        snakeBody.unshift(newElement)
        if(onFood(newElement)){
            numberSegments += EXPANSION_RATE
        }

        if(snakeBody.length > numberSegments){
            snakeBody.pop()
        }
    }
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
      const snakeElement = document.createElement('div')
      snakeElement.style.gridRowStart = segment.y
      snakeElement.style.gridColumnStart = segment.x
      snakeElement.classList.add('snake')
      gameBoard.appendChild(snakeElement)
    })
}

export function onSnake(position, { ignoreHead = false } = {}){
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

export function equalPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}

export function getSnakeHead(){
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}