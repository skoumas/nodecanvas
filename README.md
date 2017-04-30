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

# Technology selection
- Terminal Kit: For the terminal input functions
- Mocha: For testing
- Chai: For Testing

# Thanks
To Mr Bresenham and his line algorithm! 
https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm

# More info
More info about me at www.skoumas.com
