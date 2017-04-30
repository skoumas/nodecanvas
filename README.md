# Introduction

The following program is a canvas implemented in node. You can perform basic actions here such as draw lines, rectangles and use the fill bucket tool as well. You are going to see the canvas as a series as a string in your terminal. Press D for a quick demo!

# Usage
```bash
$ npm install
$ npm start
```
Once the app is running, you can start entering commands. For a quick demo type D. You should be able to see a sequence of commands applied to the canvas.Press Q to exit.
```bash
>> D
>> Q
```

For a customized experience you can use your own commands to alter the canvas.


# Customized Usage
Create a new Canvas (10,10)
```bash 
$ C 10 10 
```
Draw line from (1,1) to (10,10)!
```bash 
$ L 1 1 10 10 
```
Draw rectangle from (1,1) to (5,5)!
```bash 
$ R 1 1 5 5 
```
Start filling from (7,7) with the 'colour' 'H'
```bash 
$ B 7 7 H 
```
Quit
```bash 
$ Q
```

# Testing
```bash
$ npm test
```

# How it works
- We use the Commands.add to add commands which the inputing() function in app through the terminal-kit
uses to determine action. 
- We create a new Grid(w,h) that stores all the points as Point instance which contains only the color
information (for now). The x,y is actually the x,y of the multidimentional array.
We could argue that another way to implement would be to have the x and y at the point object
but I believe this method is best as we can store the x and y into the array structure which 
resembles a grid by default.
- In the Grid object we have our Fill, Line and Rect functions which manupulate the grid.
- The main manipulative function is the setPoint function of course.
- Note that there is the 'user friendly' x and y value which start from 1 until the end of the canvas
and differs from the 0 - (end of canvas -1) array value.
- We load an intro text from intro.txt
- We use the Command object to determine if the values added are correct.
- It's so easy to add a new Command. Just commands.add("T",[],function(e){/*do this*/})

# Special Cases / Extra Requirements
- Taking in considaration that the user might input something in the wrong format
needed to implement the commands object in which the commands are handled and
checked for their validity.
- Thought that it would be nice to implement the line function
including diagonical values.
- Added the 'E' command which erases the grid.
- Added the 'X' command which kickes off the diagonal lines demo!

# Assumptions
- The user has internet connection to run npm install!
- The user has understanding of how to use the terminal as no UI is involved.

# Technology selection
- Terminal Kit:   For having terminal/keyboard functions
- Mocha, Assert:  For testing
- JSlint, eslint: For beautiful code

# Thanks
To Mr Bresenham and his line algorithm! 
https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm

# Screenshot
![Alt text](/screenshot.png?raw=true "Optional Title")

# More info
More info about me at www.skoumas.com