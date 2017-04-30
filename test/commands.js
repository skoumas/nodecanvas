(function () {
    "use strict";

    const assert = require("assert");
    const Commands = require("../src/commands").Commands;
    const Command = require("../src/commands").Command;

    describe("Command", function () {
        describe("#()", function () {
            it("should be created", function () {
                assert.doesNotThrow(function () {
                    new Command("s", ["i", "i"], function () {}).toString();
                });
            });

            it("should not accept integer as symbol", function () {
                assert.throws(function () {
                    new Command(1, ["i", "i"], function () {}).toString();
                }, /false == true/);
            });

            it("should only accept null or array for expecting params", function () {
                assert.throws(function () {
                    new Command("S", 123, function () {}).toString();
                }, /false == true/);
            });

            it("should only accept function for callback", function () {
                assert.throws(function () {
                    new Command("S", null, 1).toString();
                }, /false == true/);
            });

            it("should accept only if all params are entered", function () {
                assert.throws(function () {
                    new Command().toString();
                }, /false == true/);
            });
        });

        describe("validate()", function () {
            it("should validate params", function () {
                let testCommand = new Command("s", ["i", "i"], function () {

                });
                let validation = testCommand.validateParams(["i", "i"], ["A", "B"]);
                assert.notEqual(validation, false);
            });
        });

        describe("execute()", function () {
            it("should accept params", function () {
                let testCommand = new Command("s", ["i", "i"], function () {
                });
                assert.throws(function () {
                    testCommand.execute();
                }, /false == true/);
            });

            it("should be executed with good params", function () {
                let testVariable = "";
                let testCommand = new Command("s", ["i", "i"], function () {
                    testVariable = "Hello";
                });
                testCommand.execute([1, 1]);
                assert.equal(testVariable, "Hello");
            });

            it("should not be executed with wrong number of params", function () {
                let testVariable = "";
                let testCommand = new Command("s", [], function () {
                    testVariable = "Hello";
                });
                testCommand.execute([1, 2, 3, "4"]);
                assert.equal(testVariable, "Hello");
            });

            it("should not be executed with bad params", function () {
                let testVariable = "";
                let testCommand = new Command("s", ["s", "i", "s"], function () {
                    testVariable = "Hello";
                });
                testCommand.execute([1, "s", 1]);
                assert.equal(testVariable, "Hello");
            });
        });
    });

    describe("Commands", function () {
        describe("#()", function () {
            it("should initiate", function () {
                assert.doesNotThrow(function () {
                    new Commands().toString();
                });
            });
        });

        describe("add()", function () {
            it("should add a command", function () {
                let testCommands = new Commands();
                assert.doesNotThrow(function () {
                    testCommands.add("s", ["i", "i"], function () {});
                });
                assert.equal(testCommands.get()[0] instanceof Command, true);
            });

            it("should add a command only once (no duplication)", function () {
                let testCommands = new Commands();
                assert.doesNotThrow(function () {
                    testCommands.add("s", ["i", "i"], function () {});
                });
                assert.doesNotThrow(function () {
                    testCommands.add("s", ["i", "i"], function () {});
                });
                assert.equal(testCommands.get().length, 1);
            });
        });
    });
}());
