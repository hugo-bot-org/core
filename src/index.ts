import * as path from 'path';

import { Test } from "./test";

import { Propulsion } from './core/Propulsion.core';

import { ConfigReader } from "./helpers/ConfigReader.helper";
import { Factory } from './factories/main.factory';
import { INSTANCES } from './factories/instances.const';

export class HUGO {

    private propulsion: Propulsion;

    public constructor() {
        this.setRootDir();
        Test.testPin23();

        const factory = new Factory();

        try {
            const instance = factory.getInstance(INSTANCES.WPI);
            console.log(instance);
        } catch (e) {
            console.log(e);
        }

        // this.propulsion = new Propulsion();
    }

    private setRootDir() {
        const arrayFormPath = path.resolve(__dirname)
            .split(path.sep);
        arrayFormPath.pop();
        arrayFormPath.shift();

        let stringFormPath = '';
        arrayFormPath.forEach(e => {
            stringFormPath += path.sep + e;
        });

        (global as any).rootDir = stringFormPath + path.sep;
    }
}

new HUGO();