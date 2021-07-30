////////////////////BOILER PLATE CODE\\\\\\\\\\\\\\\\\\\\\\\\

//Call objects of Matter JS
const {Engine, Render, Runner, World, Bodies} = Matter
console.log(Matter)

//Create
const engine = Engine.create() //this creates a world object
const {world} = engine
console.log(world)

const width = 600
const height = 600

const render = Render.create({
  element: document.body, //options object showing where to render
  engine: engine, //point ot our created engine
  options: {
    // size on canvas
    wireframes: true,
    width, //we will add to this later-remove static sizes
    height,
  },
})

Render.run(render) //start to render
Runner.run(Runner.create(), engine) //coordinates the states of our engine

////////////////////BOILER PLATE CODE\\\\\\\\\\\\\\\\\\\\\\\\

//WALLS - Give the canvas a boundary that keeps our shapes on tht page\\
const walls = [
  Bodies.rectangle(width / 2, 0, width, 20, {isStatic: true}),
  Bodies.rectangle(width / 2, height, width, 20, {isStatic: true}),
  Bodies.rectangle(width, height / 2, 20, height, {isStatic: true}),
  Bodies.rectangle(0, height / 2, 20, height, {isStatic: true}),
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

const cells = 3

const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false))
console.log(grid)

//TEST to see if we are modifying 1 or all arrays
// grid[0].push(true)
// 4

//VERTICAL ARRAY

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false))
console.log(verticals)

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false))
console.log(horizontals)

const startRow = Math.floor(Math.random()*cells)
const startColumn = Math.floor(Math.random() * cells)

console.log(startRow, startColumn)

const moveCell = (rew, column) => {
  // If I have visited the cell at [row, column], then return

  // Mark this cell as being visited

  // Assemble randomly-ordered list of neighbors

  // For each neighbor

  // See if that neighbor is out of bounds

  // If we have visited that neighbor, continue to next neighbor

  // Remove a wall from either horizontals or verticals

  // Visit that next cell

}
moveCell(startRow,startColumn)