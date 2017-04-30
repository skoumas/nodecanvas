(function () {
    "use strict";

    const assert = require("assert");
    const Canvas = require("../src/canvas");
    const Grid = Canvas.Grid;
    const Point = Canvas.Point;

    describe("Point", function () {
        describe("#()", function () {
            it("should accept string", function () {
                assert.doesNotThrow(function () {
                    new Point("#ffffff").toString();
                });
            });

            it("should should have one param", function () {
                assert.throws(function () {
                    new Point().toString();
                }, /false == true/);
            });

            it("should should not accept integers", function () {
                assert.throws(function () {
                    new Point(12).toString();
                }, /false == true/);
            });
        });

        describe("getColor()", function () {
            it("should return the color of the point", function () {
                let point = new Point("o");
                assert.equal(point.getColor(), "o");
            });
        });

        describe("setColor()", function () {
            it("should accept 'colour' which is only one character", function () {
                assert.throws(function () {
                    let point = new Point();
                    point.setColor("#dddddd");
                }, /false == true/);
            });

            it("should set the new color of a point", function () {
                let point = new Point("o");
                point.setColor("X");
                assert.equal(point.getColor(), "X");
            });
        });
    });

    describe("Grid", function () {
        describe("#()", function () {
            it("should be created", function () {
                assert.doesNotThrow(function () {
                    new Grid(10, 10).toString();
                });
            });

            it("should not accept floating points", function () {
                assert.throws(function () {
                    new Grid(0.1, 0.1).toString();
                }, /false == true/);
            });

            it("should not accept strings", function () {
                assert.throws(function () {
                    new Grid("s", "S").toString();
                }, /false == true/);
            });

            it("should have two params", function () {
                assert.throws(function () {
                    new Grid().toString();
                }, /false == true/);
            });
        });

        describe("getH()", function () {
            it("should return the height of the grid", function () {
                let grid = new Grid(10, 10);
                let tempGrid = grid.getH();
                assert.equal(tempGrid, 10);
            });
        });

        describe("getW()", function () {
            it("should return the wifth of the grid", function () {
                let grid = new Grid(10, 10);
                let tempGrid = grid.getW();
                assert.equal(tempGrid, 10);
            });
        });

        describe("getGrid()", function () {
            it("should return us an array if no x y specified", function () {
                let grid = new Grid(10, 10);
                let tempGrid = grid.getGrid();
                assert.equal(typeof tempGrid, "object");
            });
            it("should return us a specific Point is x y specified", function () {
                let grid = new Grid(10, 10);
                let tempGrid = grid.getGrid(1, 1);
                assert.equal(tempGrid instanceof Point, true);
            });
        });

        describe("initiate()", function () {
            it("should return a multidimentional array w and h size", function () {
                let grid = new Grid(10, 10);
                let tempGrid = grid.getGrid();
                for (let x = 0; x < 10; x++) {
                    for (let y = 0; y < 10; y++) {
                        assert.equal(tempGrid[x][y] instanceof Point, true);
                    }
                }
                assert.equal(tempGrid[0].length, 10);
                assert.equal(tempGrid.length, 10);
            });
        });

        describe("toString()", function () {
            it("should have a fixed number of | and - that suround the grid", function () {
                let grid = new Grid(10, 10);
                let stringGrid = grid.toString();
                let countTopBottom = (stringGrid.match(/-/g) || []).length;
                assert.equal(countTopBottom, 10 * 2 + 4);
                let countLeftRight = (stringGrid.match(/\|/g) || []).length;
                assert.equal(countLeftRight, 10 * 2);
            });

            it("should have a fixed number characters excluding the borders", function () {
                let x = 100;
                let y = 100;
                let grid = new Grid(x, y);
                let stringGrid = grid.toString();
                let countTopBottom = (stringGrid.match(/-/g) || []).length;
                let countLeftRight = (stringGrid.match(/\|/g) || []).length;
                // w * h + theTopBorders + theleftRightBorders
                // + 10 breakspaces + 2 break spaces from top bottom!
                assert.equal(stringGrid.length, x * y + countTopBottom + countLeftRight + y + 2);
            });
        });

        describe("setPoint()", function () {
            it("should have x y integer and accept one string", function () {
                let grid = new Grid(10, 10);
                assert.throws(function () {
                    grid.setPoint("10", 1, "12");
                }, /false == true/);
            });
            it("should change the value of the Point in question", function () {
                let grid = new Grid(10, 10);
                assert.doesNotThrow(function () {
                    grid.setPoint(5, 5, "X");
                    assert.equal(grid.getGrid(5 - 1, 5 - 1).getColor(), "X");
                });
            });
            it("should not accept | or -", function () {
                let grid = new Grid(10, 10);
                assert.doesNotThrow(function () {
                    grid.setPoint(5, 5, "|");
                    assert.equal(grid.getGrid(5 - 1, 5 - 1).getColor(), "");
                    grid.setPoint(5, 5, "-");
                    assert.equal(grid.getGrid(5 - 1, 5 - 1).getColor(), "");
                });
            });
        });

        describe("Line()", function () {
            it("should create a horizontal line in the array using the 'X' symbol", function () {
                let grid = new Grid(10, 10);
                let x0 = 1;
                let x1 = 10;
                let y = 1;

                grid.Line(x0, y, x1, y);
                for (let x = x0; x <= x1; x++) {
                    assert.equal(grid.getGrid(x - 1, y - 1).getColor(), "X");
                }
            });

            it("should create a vertical line in the array using the 'X' symbol", function () {
                let grid = new Grid(10, 10);
                let x = 5;
                let y0 = 1;
                let y1 = 10;

                grid.Line(x, y0, x, y1);
                for (let y = y0; y <= y1; y++) {
                    assert.equal(grid.getGrid(x - 1, y - 1).getColor(), "X");
                }
            });

            it("should create a diagonal line in the array using the 'X' symbol", function () {
                let grid = new Grid(10, 10);
                let x0 = 1;
                let y0 = 1;
                let x1 = 5;
                let y1 = 5;

                grid.Line(x0, y0, x1, y1);
                for (let x = x0; x <= x1; x++) {
                    assert.equal(grid.getGrid(x - 1, x - 1).getColor(), "X");
                }
            });
        });
        
        describe("Rect()", function () {
            it("should create a renctangle consisting of 'X' colour", function () {
                let grid = new Grid(10, 10);
                let x0 = 1;
                let y0 = 1;
                let x1 = 5;
                let y1 = 5;

                grid.Rect(x0, y, x1, y);
                for (let x = x0; x <= x1; x++) {
                    assert.equal(grid.getGrid(x - 1, y - 1).getColor(), "X");
                }
            });
         });
    });
}());
