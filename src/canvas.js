module.exports = (function () {
    "use strict";

    const assert = require("assert");

    /**
     * Represents a pixel in two dimensions.
     * @constructor
     * @param {string} color
     */
    const Point = function (color) {
        assert(typeof color === "string");

        this.setColor = function (ncolor) {
            // assert(color.length === 1);
            color = ncolor;
        };

        this.getColor = function () {
            return color;
        };
    };

    /**
     * Represents the Grid of the app
     * @constructor
     * @param {number} w The width of the grid
     * @param {number} y The height of the grid
     */
    const Grid = function (w, h) {
        assert(w !== undefined);
        assert(h !== undefined);
        assert(Number.isInteger(w));
        assert(Number.isInteger(h));

        let grid = new Map();

        this.getW = function () {
            return w;
        };

        this.getH = function () {
            return h;
        };

        /**
         * Gets the whole grid if no x y defined or a specific pixel in the grid.
         * @param {Array.<Array.<number>>} offsets In the form of: [[offsetToX, offsetToY], ...]
         * @returns {Array.<Coordinates>}
        */
        this.getGrid = function (x, y) {
            if (x === undefined || y === undefined) {
                return grid;
            } else {
                return grid[x][y];
            }
        };

        grid = this.initiate(w, h);
    };

    /**
     * Initiates the array into a 2d array.
     * @param {Array.<Array.<number>>} offsets In the form of: [[offsetToX, offsetToY], ...]
     * @returns {Array.<Coordinates>}
    */
    Grid.prototype.initiate = function (w, h) {
        let temp = [];
        for (let y = 0; y < h; ++y) {
            temp[y] = [];
            for (let x = 0; x < w; ++x) {
                temp[y][x] = new Point("");
            }
        }
        return temp;
    };

    /**
     * Adds numeric offsets.
     * @param {Array.<Array.<number>>} offsets In the form of: [[offsetToX, offsetToY], ...]
     * @returns {Array.<Coordinates>}
    */
    Grid.prototype.setPoint = function (x, y, value) {
        assert(Number.isInteger(x));
        assert(Number.isInteger(y));
        if (value === "|" || value === "-") {
            return;
        }
        assert(typeof value === "string");
        this.getGrid(x - 1, y - 1).setColor(value);
    };

    /**
     * Creates a line between two points using the
       bresenham algorithm. Diagonal lines also supported.
     * @param {integer} x0 The x value of the first point
     * @param {integer} y0 The y value of the first point
     * @param {integer} x1 The x value of the second point
     * @param {integer} y1 The y value of the second point
    */
    Grid.prototype.Line = function (x0, y0, x1, y1) {
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let sx = x0 < x1 ? 1 : -1;
        let sy = y0 < y1 ? 1 : -1;
        let err = dx - dy;

        while (true) {
            this.setPoint(x0, y0, "X");
            if (x0 === x1 && y0 === y1) {
                break;
            }
            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
        // this.setPoint(x1, y1, "X");
    };

    /**
     * Bucket fill that fills space.
     * @param {integer} x  The x value of where the fill will start
     * @param {integer} y  The y value of where the fill will start
     * @param {string}  pc The initial color we aim to replace. Leave null.
     * @param {string}  nc The new color that we want to use.
    */
    Grid.prototype.Fill = function (x, y, pc, nc) {
        if (pc === null) {
            pc = this.getGrid()[y - 1][x - 1].getColor();
        }

        if (y <= 0 || x <= 0 || x > this.getW() || y > this.getH()) { return; }
        if (this.getGrid()[y - 1][x - 1].getColor() !== pc) { return; }
        this.getGrid()[y - 1][x - 1].setColor(nc);
        this.Fill(x, y + 1, pc, nc);
        this.Fill(x, y - 1, pc, nc);
        this.Fill(x + 1, y, pc, nc);
        this.Fill(x - 1, y, pc, nc);
    };

    /**
     * Creates a rect between two points using the bresenham algorithm.
       Diagonal lines also supported.
     * @param {integer} x0 The x value of the first point
     * @param {integer} y0 The y value of the first point
     * @param {integer} x1 The x value of the second point
     * @param {integer} y1 The y value of the second point
    */
    Grid.prototype.Rect = function (x1, y1, x2, y2) {
        for (let x = x1; x <= x2; x++) {
            this.setPoint(x, y1, "X");
        }
        for (let x = x1; x <= x2; x++) {
            this.setPoint(x, y2, "X");
        }
        for (let y = y1; y <= y2; y++) {
            this.setPoint(x1, y, "X");
        }
        for (let y = y1; y <= y2; y++) {
            this.setPoint(x2, y, "X");
        }
    };

    /**
     * Transforms the array into a string
     */
    Grid.prototype.toString = function () {
        let string = "";

        for (let x = -2; x < this.getW(); ++x) {
            string += "-";
        }
        string += "\n";

        for (let y = 0; y < this.getH(); ++y) {
            string += "|";
            for (let x = 0; x < this.getW(); ++x) {
                if (this.getGrid(y, x).getColor() !== "") {
                    string += this.getGrid(y, x).getColor();
                } else {
                    string += " ";
                }
            }
            string += "|";
            if (y < this.getH()) {
                string += "\n";
            }
        }

        for (let x = -2; x < this.getW(); ++x) {
            string += "-";
        }
        string += "\n";
        return string;
    };

    return {
        "Grid": Grid,
        "Point": Point
    };
}());
