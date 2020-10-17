import {onSnake, equalPositions} from './snake.js'
import {randomGridPosition} from './grid.js'

let food = {x: 21, y: 2}

export function update(){
    if(onSnake(food)){
        food = getRandomFoodPosition()
    }
}

export function onFood(pos){
    return equalPositions(food, pos)
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition(){
    let newFoodPosition = randomGridPosition()
    while (onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}