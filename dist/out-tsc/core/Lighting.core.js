"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigReader_helper_1 = require("../helpers/ConfigReader.helper");
class Lighting {
    constructor(wpi) {
        this.wpi = wpi;
        this.wpi.wiringPiSetupGpio();
        this.lights = ConfigReader_helper_1.ConfigReader.getConfigSync().pins.lights;
        this.setPinModes();
    }
    setFrontLights(mode) {
        if (mode) {
            this.wpi.digitalWrite(this.lights.A, 1);
            this.wpi.digitalWrite(this.lights.B, 1);
            return;
        }
        this.wpi.digitalWrite(this.lights.A, 0);
        this.wpi.digitalWrite(this.lights.B, 0);
    }
    setPinModes() {
        this.wpi.pinMode(this.lights.A, this.wpi.OUTPUT);
        this.wpi.pinMode(this.lights.B, this.wpi.OUTPUT);
    }
}
exports.Lighting = Lighting;
