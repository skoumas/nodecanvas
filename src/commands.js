module.exports = (function () {
    "use strict";

    /**
     * A collection of commands that can be populated, searched and executed.
     * @constructor
    */
    const Commands = function () {
        let commands = []; // I am storing my commands here
        let defaultCommand;
        
        this.getDefaultCommand = function() {
            return defaultCommand;
        }

        this.setDefaultCommand = function(newCommand) {
            defaultCommand = newCommand;
        }

        this.get = function () {
            return commands;
        };

    };

    /**
     * Adds a new command into the array.
     * @param {string}     symbol:    The symbol character that is about to be executed
     * @param {Array()}    expecting: An array containing "i" for integer or "s"
       for string and refers to the acceptable params for this command.
     * @param {function()} expecting: The callback function that is to be executed.
    */
    Commands.prototype.add = function (symbol, params, callback) {
        this.get().push(new Command(symbol, params, callback));
    };

    /**
     * Sets the default command to be executed when no other command matches the user's input.
     * @param {function()} expecting: The callback function that is to be executed.
    */
    Commands.prototype.setDefault = function (callback) {
        this.setDefaultCommand(callback);
    };

    /**
     * Sets the default command to be executed when no other command matches the user's input.
     * @param {function()} expecting: The callback function that is to be executed.
    */
    Commands.prototype.executeDefault = function () {
        this.getDefaultCommand()();
    };

    /**
     * Executes a command after searching the list of commands.
     * @param   {string} symbol: The symbol character that is about to be executed
     * @returns {Command}
    */
    Commands.prototype.execute = function (symbol, params) {
        let command = this.search(symbol);
        if (command) {
            command.execute(params);
        } else {
            this.executeDefault();
            return false;
        }
    };

    /**
     * Searches a command after searching the list of commands.
     * @param   {string} symbol: The symbol character that is about to be executed
     * @returns {Command}
    */
    Commands.prototype.search = function (symbol) {
        for (let i = 0; i < this.get().length; i++) {
            if (this.get()[i].getSymbol() == symbol) {
                return this.get()[i];
            }
        }
        return false;
    };

    /**
     * An individual command with it's symbol, expecting commands and callback function.
     * @constructor
     * @param {string}     symbol:    The symbol character that is about to be executed
     * @param {Array()}    expecting: An array containing "i" for integer or "s"
       for string and refers to the acceptable params for this command.
     * @param {function()} expecting: The callback function that is to be executed.
    */
    const Command = function (symbol, expecting, callback) {
        this.getSymbol = function () {
            return symbol;
        };

        this.execute = function (callBackParams) {
            if (this.validateParams(expecting, callBackParams)) {
                callback(callBackParams);
                return true;
            } else {
                return false;
            }
        };

        this.getExpecting = function () {
            return expecting;
        };
    };

    /**
     * An individual command with it's symbol, expecting commands and callback function.
     * @constructor
     * @param {string}     symbol:    The symbol character that is about to be executed
     * @param {Array()}    expecting: An array containing "i" for integer or "s"
       for string and refers to the acceptable params for this command.
     * @param {function()} expecting: The callback function that is to be executed.
    */
    Command.prototype.validateParams = function (expectingParams, receivedParams) {
        if (expectingParams.length !== receivedParams.length) {
            console.log("\nExpected " + expectingParams.length + " params.");
            return false;
        }
        for (let i = 0; i < expectingParams.length; i++) {
            if (expectingParams[i] == "i") {
                if (parseInt(receivedParams[i])) {
                    receivedParams[i] = parseInt(receivedParams[i]);
                } else {
                    console.log("\n Expected param " + (i + 1) + " to be integer");
                    return false;
                }
            } else if (expectingParams[i] == "s") {
                if (typeof receivedParams[i] === "string") {
                } else {
                    console.log("\n Expected param " + (i + 1) + " to be integer");
                    return false;
                }
            }
        }
        return true;
    };

    return {
        "Commands": new Commands() // I'm doing this for convinience.
    };

})();
