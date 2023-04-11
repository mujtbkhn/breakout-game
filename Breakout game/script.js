const grid = document.querySelector('.grid')
const ScoreDisplay = document.querySelector('#score')
const BlockWidth = 100
const BlockHeight = 20
const BoardWidth = 560
const BoardHeight = 300
let timerId
const BallDiameter = 20

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballcurrentPosition = ballStart
// constructor calling 
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + BlockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + BlockHeight]
        this.topRight = [xAxis + BlockWidth, yAxis + BlockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

function addBlocks() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }

}

addBlocks()


//adding user

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw the ball
function drawBall() {

    ball.style.left = ballcurrentPosition[0] + 'px'
    ball.style.bottom = ballcurrentPosition[1] + 'px'
}

//move user 
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < BoardWidth - BlockWidth) {
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// create ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//moving the ball
function moveBall() {
    ballcurrentPosition[0] += xDirection
    ballcurrentPosition[1] += yDirection
    drawBall()
    checkforCollisions()
}
xDirection = 2
yDirection = 2

timerId = setInterval(moveBall, 20)

//check for collisions
function checkforCollisions() {
    //check for block collisions

    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballcurrentPosition[0] > blocks[i].bottomLeft[0] && ballcurrentPosition[0] < blocks[i].bottomRight[0])
            && ((ballcurrentPosition[1] + BallDiameter) > blocks[i].bottomLeft[1] && ballcurrentPosition[1] < blocks[i].bottomRight[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            ScoreDisplay.innerHTML = score

            if(blocks.length == 0){
                ScoreDisplay.innerHTML = 'You WIN'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }

        }
    }

    if (
        ballcurrentPosition[0] >= (BoardWidth - BallDiameter) ||
        ballcurrentPosition[1] >= (BoardHeight - BallDiameter) ||
        ballcurrentPosition[0] <= 0
    ) {
        changeDirection()
    }

    if((ballcurrentPosition[0] > currentPosition[0] && ballcurrentPosition[0] < currentPosition[0] + BlockWidth) && 
    (ballcurrentPosition[1] > currentPosition[1] && ballcurrentPosition[1] < currentPosition[1] + BlockHeight)
    )
    {
        changeDirection()
    }

    //game over
    if (ballcurrentPosition[1] <= 0) {
        clearInterval(timerId)
        ScoreDisplay.innerHTML = 'You lose'
        document.removeEventListener('keydown', moveUser)

    }
}
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        // yDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        // yDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
}