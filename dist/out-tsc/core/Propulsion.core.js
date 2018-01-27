"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigReader_helper_1 = require("../helpers/ConfigReader.helper");
class Propulsion {
    constructor() {
        this.motors = ConfigReader_helper_1.ConfigReader.getConfigSync().pins.motors;
        console.log(this.motors);
    }
}
exports.Propulsion = Propulsion;
