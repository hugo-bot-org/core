"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WPI = require("wiringpi-node");
class WPIInstance {
    get instance() {
        return this._wpi;
    }
    constructor() {
        this._wpi = WPI;
    }
}
exports.WPIInstance = WPIInstance;
