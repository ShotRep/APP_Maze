////////////////////BOILER PLATE CODE\\\\\\\\\\\\\\\\\\\\\\\\

//Call objects of Matter JS
const {Engine, Render, Runner, World, Bodies, Body, Events} = Matter
console.log(Matter)

//Create
const engine = Engine.create() //this creates a world object
engine.world.gravity.y = 0
engine.world.gravity.x = 0
const {world} = engine
console.log(world)

const width = window.innerWidth - 9
const height = window.innerHeight - 9

const render = Render.create({
  element: document.body, //options object showing where to render
  engine: engine, //point ot our created engine
  options: {
    // size on canvas
    wireframes: false,
    width, //we will add to this later-remove static sizes
    height,
  },
})

Render.run(render) //start to render
Runner.run(Runner.create(), engine) //coordinates the states of our engine

////////////////////BOILER PLATE CODE\\\\\\\\\\\\\\\\\\\\\\\\

//WALLS - Give the canvas a boundary that keeps our shapes on tht page\\
const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, {isStatic: true}),
  Bodies.rectangle(width / 2, height, width, 2, {isStatic: true}),
  Bodies.rectangle(width, height / 2, 2, height, {isStatic: true}),
  Bodies.rectangle(0, height / 2, 2, height, {isStatic: true}),
]
World.add(world, walls)

// Add shapes to our world individually\\
// const shape = Bodies.rectangle(100, 100, 50, 50, {  //positionX, positionY, sizeW, sizeH
//   isStatic: false  //Turn gravity on and off
// })
// World.add(world,shape)

//MAZE GENERATION
//create grid array for the maze
// | vertical
// - horizontal

// const grid = []
// for (let i = 0; i < 3; i++) {
//   grid.push([])
//   for (let j = 0; j < 3; j++) {
//     grid[i].push(false)
//   }
// }

const shuffle = (arr) => {
  let counter = arr.length

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter)

    counter--

    const temp = arr[counter]
    arr[counter] = arr[index]
    arr[index] = temp
  }
  return arr
}

//would like to make this auto adjust
const autoHeight = Math.floor(window.innerHeight * 0.03)
const autoWidth = Math.floor(window.innerWidth * 0.03)
// const autoAdjust = autoHeight
const cellsHorizontal = autoWidth
const cellsVertical = autoHeight

const unitLengthX = width / cellsHorizontal
const unitLengthY = height / cellsVertical

// const unitLengthX = width / autoAdjust
// const unitLengthY = height / autoAdjust

// const cells = 6
// const unitLength = width / cells

const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false))
console.log(grid)

// const grid = Array(autoAdjust)
//   .fill(null)
//   .map(() => Array(autoAdjust).fill(false))
// console.log(grid)

//TEST to see if we are modifying 1 or all arrays
// grid[0].push(true)
// 4

//VERTICAL ARRAY

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false))
console.log(verticals)

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false))
console.log(horizontals)

const startRow = Math.floor(Math.random() * cellsVertical)
const startColumn = Math.floor(Math.random() * cellsHorizontal)

console.log(startRow, startColumn)

const stepThroughCell = (row, column) => {
  // If I have visited the cell at [row, column], then return
  if (grid[row][column]) {
    return
  }
  // Mark this cell as being visited
  grid[row][column] = true
  // Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column, "up"],
    [row, column + 1, "right"],
    [row + 1, column, "down"],
    [row, column - 1, "left"],
  ])
  console.log(neighbors)
  // For each neighbor
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor
    // See if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cellsVertical ||
      nextColumn < 0 ||
      nextColumn >= cellsHorizontal
    ) {
      continue
    }
    // If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue
    }
    // Remove a wall from either horizontals or verticals
    if (direction === "left") {
      verticals[row][column - 1] = true
    } else if (direction === "right") {
      verticals[row][column] = true
    } else if (direction === "up") {
      horizontals[row - 1][column] = true
    } else if (direction === "down") {
      horizontals[row][column] = true
    }
    // Visit that next cell
    stepThroughCell(nextRow, nextColumn)
  }
}
stepThroughCell(startRow, startColumn)
console.log(grid)

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      5,
      {
        label: "wall",
        isStatic: true,
        render: {
          fillStyle: "red",
        },
      }
    )
    World.add(world, wall)
  })
})

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      5,
      unitLengthY,
      {
        label: "wall",
        isStatic: true,
        render: {
          fillStyle: "red",
        },
      }
    )
    World.add(world, wall)
  })
})

//GOAL
minSquare = Math.min(unitLengthX, unitLengthY) / 2
const goal = Bodies.rectangle(
  width - minSquare,
  height - minSquare,
  minSquare * 1.5,
  minSquare * 1.5,
  {
    label: "goal",
    isStatic: true,
    render: {
      fillStyle: "yellow",
    },
  }
)
World.add(world, goal)

//BALL
ballRadius = Math.min(unitLengthX, unitLengthY) / 3
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
  label: "ball",
  render: {
    fillStyle: "blue",
  },
})
World.add(world, ball)

//Movement

document.addEventListener("keydown", (even) => {
  const {x, y} = ball.velocity
  console.log(x, y)

  console.log(event)
  if (event.keyCode === 87) {
    Body.setVelocity(ball, {x: x, y: y - 2})
    console.log("move up")
  }
  if (event.keyCode === 68) {
    Body.setVelocity(ball, {x: x + 2, y: y})
    console.log("move right")
  }
  if (event.keyCode === 83) {
    Body.setVelocity(ball, {x: x, y: y + 2})
    console.log("move down")
  }
  if (event.keyCode === 65) {
    Body.setVelocity(ball, {x: x - 2, y: y})
    console.log("move left")
  }
})

//Win Condition

Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    const labels = ["ball", "goal"]
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      document.querySelector(".winner").classList.remove("hidden")
      console.log("User Won!")
      world.gravity.y = 1
      world.bodies.forEach((body) => {
        if (body.label === "wall") {
          Body.setStatic(body, false)
        }
      })
    }
  })
})
