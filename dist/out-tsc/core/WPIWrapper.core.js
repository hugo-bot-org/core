"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WPI = require("wiringpi-node");
class WPIWrapper {
    get instance() {
        return this._wpi;
    }
    constructor() {
        this._wpi = WPI;
    }
}
exports.WPIWrapper = WPIWrapper;
