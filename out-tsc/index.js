"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const main_factory_1 = require("./factories/main.factory");
const instances_const_1 = require("./factories/instances.const");
class HUGO {
    constructor() {
        this.setRootDir();
        const factory = new main_factory_1.Factory();
        this.propulsion = factory.getInstance(instances_const_1.INSTANCES.Propulsion);
        this.lighting = factory.getInstance(instances_const_1.INSTANCES.Lighting);
    }
    setRootDir() {
        const arrayFormPath = path.resolve(__dirname)
            .split(path.sep);
        arrayFormPath.pop();
        arrayFormPath.shift();
        let stringFormPath = '';
        arrayFormPath.forEach(e => {
            stringFormPath += path.sep + e;
        });
        global.rootDir = stringFormPath + path.sep;
    }
}
exports.HUGO = HUGO;
new HUGO();
