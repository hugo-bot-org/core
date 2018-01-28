"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wpi_factory_1 = require("./wpi.factory");
const lighting_factory_1 = require("./lighting.factory");
const propulsion_factory_1 = require("./propulsion.factory");
class Factory {
    constructor() {
        this.factories = {
            WPI: wpi_factory_1.WPIFactory.resolve(),
            Propulsion: propulsion_factory_1.PropulsionFactory.resolve(),
            Lighting: lighting_factory_1.LightingFactory.resolve(),
        };
    }
    getInstance(instance) {
        const returnInstance = this.factories[instance];
        if (!returnInstance) {
            throw new Error('The factory required does not exists: ' + instance);
        }
        return returnInstance;
    }
}
exports.Factory = Factory;
