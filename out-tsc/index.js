"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const test_1 = require("./test");
const main_factory_1 = require("./factories/main.factory");
const instances_const_1 = require("./factories/instances.const");
class HUGO {
    constructor() {
        this.setRootDir();
        test_1.Test.testPin23();
        const factory = new main_factory_1.Factory();
        this.propulsion = factory.getInstance(instances_const_1.INSTANCES.Propulsion);
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
