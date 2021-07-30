<h1 align="center">Maze App - Drawing Animations</h1>

<h3 align="center">The Modern Javascript Bootcamp Course (2021) part II Applications</h3>    

<!-- GETTING STARTED -->
## Getting Started
Part 2 of the modern bootcamp course, switching from classroom style to applied learning through the building of projects. 


[MDN JS Web Docs - URL](https://developer.mozilla.org/en-US/docs/Web/javascript)

[Matter JS Library - URL](https://brm.io/matter-js)
Matter.js is a 2D physics engine for the web


## Challenges for this project.
Q: How to generate the maze?
A: There are many algorithms that will do this.  Tree data structure + recursion for 
   something simple will be used.

Q: How to draw on screen?
A: Use Matter JS to draw the maze onto a canvas element 

Q: How to make keyboard keys operate with game?
A: Matter JS has teh ability to map key presses to movement of shapes.

Q: How to detect when the ball touches the green square?
A: Matter JS has the ability to detect collisions between different shapes and report them
   to us as events.


## Building a Maze.
1.) Create a grid of cells

2.) Pick a random starting cell

3.) For that cell, build a randomly-ordered list of neighbors

4.) if a neighbor has been visited before, remove it from the list

5.) For each remaining neighbor, 'move' to it and remove the wall between those two cells

6.) Repeat for this new neighbor


## Matter JS Terminology - High Level Notes.
[Matter JS Docs](https://brm.io/matter-js/docs/)
WORLD: Object that contains all of the different "things" in our matter app.
ENGINE: Reads in the current state of the world from the world object, then calculates changes in the positions of all the different shapes.
RUNNER: Gets the engine and world to work together. Runs about 60 times per second.
RENDER: Whenever the engine processes an update, Render will take a look at all the different shapes and show them on the screen.
BODIES: A shape that we are displaying. Can be a circle, rectangle, oval, etc.

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.