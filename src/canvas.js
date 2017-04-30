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

        let grid = [new Map()];

        this.getW = function () {
            return w;
        };

        this.getH = function () {
            return h;
        };

        /**
         * Gets the whole grid if no x y defined or a specific pixel in the grid.
         * @param {number} x The x value of the pixel (user friendly mode)
           We do -1 for array value!
         * @param {number} y The x value of the pixel (user friendly mode)
           We do -1 for array value!!
         * @returns {Array}: The whole grid if no values specified or
              the specific Point.
        */
        this.getGrid = function (x, y) {
            if (x === undefined || y === undefined) {
                return grid;
            } else {
                return grid[x - 1][y - 1];
            }
        };

        this.setGrid = function (newGrid) {
            grid = newGrid;
        };

        grid = this.initiate(w, h);
    };

    /**
     * Initiates the array into a 2d array.
     * @param {Array.<Array.<number>>} offsets In the form of: [[offsetToX, offsetToY], ...]
     * @returns {Array.<Coordinates>}
    */
    Grid.prototype.initiate = function (w, h) {
        if (w < 2 || h < 2) {
            return;
        }
        let temp = [];
        for (let x = 0; x < w; ++x) {
            temp[x] = [];
            for (let y = 0; y < h; ++y) {
                temp[x][y] = new Point("");
            }
        }
        return temp;
    };

    /**
     * Checks if a value is withing boundaries.
     * @param {Array[]} v The values to be checked
    */
    Grid.prototype.within = function (xs, ys) {
        for (let i = 0; i < xs.length; i++) {
            if (xs[i] < 0 || xs[i] > this.getW()) {
                return false;
            }
        }
        for (let i = 0; i < ys.length; i++) {
            if (ys[i] < 0 || ys[i] > this.getH()) {
                return false;
            }
        }

        return true;
    };

    /**
     * Canvas exists?
    */
    Grid.prototype.exists = function () {
        return this.getH() > 2 && this.getW() > 2;
    };

    /**
     * Erases the canvas
    */
    Grid.prototype.Erase = function () {
        this.setGrid(this.initiate(this.getW(), this.getH()));
    };

    /**
     * Adds numeric offsets.
     * @param {integer} x The x value of the point
     * @param {integer} y The y value of point
     * @param {integer} value The value for the new color
    */
    Grid.prototype.setPoint = function (x, y, value) {
        if (!this.within([x], [y])) {
            return;
        }
        assert(Number.isInteger(x));
        assert(Number.isInteger(y));

        if (value === "|" || value === "-") {
            return;
        }
        assert(typeof value === "string");
        this.getGrid(x, y).setColor(value);
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
        if (!this.within([x0, x1], [y0, y1])) {
            return;
        }
        if (!this.exists()) {
            return;
        }
        assert(Number.isInteger(x0));
        assert(Number.isInteger(y0));
        assert(Number.isInteger(x1));
        assert(Number.isInteger(y1));

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
        if (!this.within([x], [y])) {
            return;
        }
        if (!this.exists()) {
            return;
        }
        assert(Number.isInteger(x));
        assert(Number.isInteger(y));
        // assert(typeof pc === "string" || pc === null);
        // assert(typeof nc === "string");

        if (pc === null) {
            pc = this.getGrid()[x][y].getColor();
        }

        if (y < 0 || x < 0 || x >= this.getW() || y >= this.getH()) { return; }
        if (this.getGrid()[x][y].getColor() !== pc) { return; }
        this.getGrid()[x][y].setColor(nc);
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
    Grid.prototype.Rect = function (x0, y0, x1, y1) {
        if (!this.within([x0, x1], [y0, y1])) {
            return;
        }
        if (!this.exists()) {
            return;
        }
        assert(Number.isInteger(x0));
        assert(Number.isInteger(y0));
        assert(Number.isInteger(x1));
        assert(Number.isInteger(y1));

        for (let x = x0; x <= x1; x++) {
            this.setPoint(x, y0, "X");
        }
        for (let x = x0; x <= x1; x++) {
            this.setPoint(x, y1, "X");
        }
        for (let y = y0; y <= y1; y++) {
            this.setPoint(x0, y, "X");
        }
        for (let y = y0; y <= y1; y++) {
            this.setPoint(x1, y, "X");
        }
    };

    /**
     * Transforms the array into a string
     */
    Grid.prototype.toString = function () {
        if (!this.exists()) {
            return "Canvas not exist or smaller than 2x2";
        }
        let string = "";

        for (let x = -2; x < this.getW(); ++x) {
            string += "-";
        }
        string += "\n";

        for (let y = 1; y <= this.getH(); ++y) {
            string += "|";
            for (let x = 1; x <= this.getW(); ++x) {
                if (this.getGrid(x, y).getColor() !== "") {
                    string += this.getGrid(x, y).getColor();
                } else {
                    string += " ";
                }
            }
            string += "|";
            if (y <= this.getH()) {
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
