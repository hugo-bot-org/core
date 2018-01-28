"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Propulsion_core_1 = require("../core/Propulsion.core");
const wpi_factory_1 = require("./wpi.factory");
class PropulsionFactory {
    static resolve() {
        if (!PropulsionFactory.instance) {
            const wpi = wpi_factory_1.WPIFactory.resolve();
            PropulsionFactory.instance = new Propulsion_core_1.Propulsion(wpi);
        }
        return PropulsionFactory.instance;
    }
}
exports.PropulsionFactory = PropulsionFactory;
