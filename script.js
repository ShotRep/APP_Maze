////////////////////BOILER PLATE CODE\\\\\\\\\\\\\\\\\\\\\\\\

//Call objects of Matter JS
const { Engine, Render, Runner, World, Bodies } = Matter
console.log(Matter)

//Create 
const engine = Engine.create()     //this creates a world object
const { world } = engine
console.log(world)

const width = 600
const height = 600

const render = Render.create({
  element: document.body,          //options object showing where to render
  engine: engine,                  //point ot our created engine
  options: {                       // size on canvas
    wireframes: true,
    width,                     //we will add to this later-remove static sizes
    height
}
})

Render.run(render)                     //start to render
Runner.run(Runner.create(), engine)   //coordinates the states of our engine

////////////////////BOILER PLATE CODE\\\\\\\\\\\\\\\\\\\\\\\\

//WALLS - Give the canvas a boundary that keeps our shapes on tht page\\
const walls = [
  Bodies.rectangle(width/2, 0, width, 20, {isStatic: true}),
  Bodies.rectangle(width/2, height, width, 20, {isStatic: true}),
  Bodies.rectangle(width, height/2, 20, height, {isStatic: true}),
  Bodies.rectangle(0, height/2, 20, height, {isStatic: true}),
]
World.add(world, walls)

// Add shapes to our world individually\\
// const shape = Bodies.rectangle(100, 100, 50, 50, {  //positionX, positionY, sizeW, sizeH
//   isStatic: false  //Turn gravity on and off
// })
// World.add(world,shape)
