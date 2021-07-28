////////////////////BOILER PLATE CODE\\\\\\\\\\\\\\\\\\\\\\\\

//Call objects of Matter JS
const { Engine, Render, Runner, World, Bodies } = Matter
console.log(Matter)

//Create 
const engine = Engine.create()  //this creates a world object
const { world } = engine
console.log(world)

const render = Render.create({
  element: document.body,          //options object showing where to render
  engine: engine,                  //point ot our created engine
  options: {                       // size on canvas
    width: 800,                     //we will add to this later-remove static sizes
    height: 600
}
})

Render.run(render)                     //start to render
Runner.run(Runner.create(), engine)   //coordinates the states of our engine

////////////////////BOILER PLATE CODE\\\\\\\\\\\\\\\\\\\\\\\\

//Add shapes to our world\\
const shape = Bodies.rectangle(100, 100, 50, 50, {  //positionX, positionY, sizeW, sizeH
  isStatic: true  //gravity is enabled so we are just pinning this shape to canvas for now
})
World.add(world,shape)
