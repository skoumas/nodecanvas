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
$ R 1 1 10 10 
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

# More info
More info about me at www.skoumas.com