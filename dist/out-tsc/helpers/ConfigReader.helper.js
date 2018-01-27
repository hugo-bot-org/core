"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class ConfigReader {
    static getConfigSync() {
        const content = fs.readFileSync(global.rootDir + 'configs/main.conf.json', 'utf8');
        if (content && JSON.parse(content)) {
            return JSON.parse(content);
        }
        return null;
    }
}
exports.ConfigReader = ConfigReader;
