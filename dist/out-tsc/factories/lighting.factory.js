"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wpi_factory_1 = require("./wpi.factory");
const Lighting_core_1 = require("../core/Lighting.core");
class LightingFactory {
    static resolve() {
        if (!LightingFactory.instance) {
            const wpi = wpi_factory_1.WPIFactory.resolve();
            LightingFactory.instance = new Lighting_core_1.Lighting(wpi);
        }
        return LightingFactory.instance;
    }
}
exports.LightingFactory = LightingFactory;
