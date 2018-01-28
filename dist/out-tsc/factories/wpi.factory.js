"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WPIWrapper_core_1 = require("../core/WPIWrapper.core");
class WPIFactory {
    static resolve() {
        if (!WPIFactory.instance) {
            WPIFactory.instance = new WPIWrapper_core_1.WPIWrapper().instance;
        }
        return WPIFactory.instance;
    }
}
exports.WPIFactory = WPIFactory;
