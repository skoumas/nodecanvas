module.exports = (function () {
    "use strict";

    const term = require("terminal-kit").terminal;
    const Canvas = require("./canvas");
    const fs = require("fs");
    const Commands = require("./commands").Commands;
    const commands = new Commands();
    const Grid = Canvas.Grid;
    let grid = new Grid(0, 0);

    /**
     * Displays text into the terminal
    */
    function line (string) {
        term.green("\n%s", string);
    }

    /**
     * Adding all the commands that we will need.
     * To add a new command simply follow the pattern below
     */
    commands.add("C", ["i", "i"], function (prms) {
        grid = new Grid(prms[0], prms[1]);
        line(grid.toString());
    });

    commands.add("L", ["i", "i", "i", "i"], function (prms) {
        grid.Line(prms[0], prms[1], prms[2], prms[3]);
        line(grid.toString());
    });

    commands.add("R", ["i", "i", "i", "i"], function (prms) {
        grid.Rect(prms[0], prms[1], prms[2], prms[3]);
        line(grid.toString());
    });

    commands.add("B", ["i", "i", "s"], function (prms) {
        grid.Fill(prms[0], prms[1], null, prms[2]);
        line(grid.toString());
    });

    commands.add("Q", [], function () {
        line("\nExiting...");
        line("Have a nice day!\n");
        process.exit();
    });

    commands.add("E", [], function () {
        grid.Erase();
        line(grid.toString());
    });

    commands.add("D", [], function () {
        line("\nDemo...\n");
        line("\nenter command: C 20 4");
        grid = new Grid(20, 4);
        line(grid.toString());
        line("\nenter command: L 1 2 6 2");
        grid.Line(1, 2, 6, 2);
        line(grid.toString());
        line("\nenter command: L 6 3 6 4");
        grid.Rect(6, 3, 6, 4);
        line(grid.toString());
        line("\nenter command: R 14 1 18 3");
        grid.Rect(14, 1, 18, 3);
        line(grid.toString());
        line("\nenter command: B 10 3 o");
        grid.Fill(10, 3, null, "o");
        line(grid.toString());
    });

    commands.add("X", [], function () {
        line("\nWelcome to the Diagonal Demo...\n");
        grid = new Grid(20, 20);
        line("\nenter command: L 1 1 20 20");
        grid.Line(1, 1, 20, 20);
        line("\nenter command: L 1 20 20 1");
        grid.Line(1, 20, 20, 1);
        line(grid.toString());
    });

    commands.setDefault(function () {
        line("\nUnknown command");
    });

    /**
     * The main loop of our app in which we rely on the user's keyboard input.
     * After each command we recall the function
    */
    function inputing () {
        term("\n>> ");
        term.inputField(
                function (error, input) {
                    if (error) {
                        inputing();
                    }
                    let prms = input.trim().split(" ");
                    prms.splice(0, 1);
                    let result = commands.execute(input[0], prms);
                    if (result !== true) {
                        line(result);
                    }
                    inputing();
                }
        );
    }

    /**
     * Initializes the app.
     * Shows a friendly message loaded from a intro.txt.
    */
    function init () {
        fs.readFile("intro.txt", "utf8", function (err, data) {
            if (err) {
                process.exit();
                return false;
            }
            line(data);
            inputing();
            return true;
        });
    }

    /**
     * Initiate
    */
    init();

    return {
        "init": init
    };
}());
