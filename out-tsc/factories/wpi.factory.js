"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GPIO_core_1 = require("../core/GPIO.core");
class WPIFactory {
    resolve() {
        if (!this.instance) {
            this.instance = new GPIO_core_1.WPIInstance();
        }
        return this.instance;
    }
}
exports.WPIFactory = WPIFactory;
