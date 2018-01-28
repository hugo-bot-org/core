"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SLEEP = require("sleep");
const WPI = require("wiringpi-node");
class Test {
    static testPin23() {
        WPI.wiringPiSetupGpio();
        WPI.pinMode(23, WPI.OUTPUT);
        WPI.digitalWrite(23, 0);
        SLEEP.msleep(500);
        WPI.digitalWrite(23, 1);
    }
}
exports.Test = Test;
