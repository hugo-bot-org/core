"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigReader_helper_1 = require("../helpers/ConfigReader.helper");
class Propulsion {
    constructor(wpi) {
        this.wpi = wpi;
        this.wpi.wiringPiSetupGpio();
        this.motors = ConfigReader_helper_1.ConfigReader.getConfigSync().pins.motors;
        this.setPinModes();
    }
    FWD() {
        this.setDriverPower(1);
        this.wpi.digitalWrite(this.motors.A.FWD, 1);
        this.wpi.digitalWrite(this.motors.B.FWD, 1);
    }
    BWD() {
        this.setDriverPower(1);
        this.wpi.digitalWrite(this.motors.A.BWD, 1);
        this.wpi.digitalWrite(this.motors.B.BWD, 1);
    }
    STOP() {
        this.setDriverPower(0);
        this.wpi.digitalWrite(this.motors.A.FWD, 0);
        this.wpi.digitalWrite(this.motors.B.FWD, 0);
        this.wpi.digitalWrite(this.motors.A.BWD, 0);
        this.wpi.digitalWrite(this.motors.B.BWD, 0);
    }
    LEFT() {
        this.setDriverPower(1);
        this.wpi.digitalWrite(this.motors.A.FWD, 1);
        this.wpi.digitalWrite(this.motors.B.BWD, 1);
    }
    RIGHT() {
        this.setDriverPower(1);
        this.wpi.digitalWrite(this.motors.A.BWD, 1);
        this.wpi.digitalWrite(this.motors.B.FWD, 1);
    }
    setPinModes() {
        this.wpi.pinMode(this.motors.driver, this.wpi.OUTPUT);
        this.wpi.pinMode(this.motors.A.FWD, this.wpi.OUTPUT);
        this.wpi.pinMode(this.motors.B.FWD, this.wpi.OUTPUT);
    }
    setDriverPower(state) {
        this.wpi.digitalWrite(this.motors.driver, state);
        if (!state) {
            this.wpi.digitalWrite(this.motors.A.FWD, 0);
            this.wpi.digitalWrite(this.motors.A.BWD, 0);
            this.wpi.digitalWrite(this.motors.B.FWD, 0);
            this.wpi.digitalWrite(this.motors.B.BWD, 0);
        }
    }
}
exports.Propulsion = Propulsion;
