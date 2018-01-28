import * as path from 'path';


import { Lighting } from './core/Lighting.core';
import { Propulsion } from './core/Propulsion.core';

import { ConfigReader } from "./helpers/ConfigReader.helper";

import { Factory } from './factories/main.factory';
import { INSTANCES } from './factories/instances.const';

import { WiringPINode } from './interfaces/wiringpi-node.interface';

export class HUGO {

    private lighting: Lighting;
    private propulsion: Propulsion;

    public constructor() {
        this.setRootDir();

        const factory = new Factory();
        this.propulsion = factory.getInstance(INSTANCES.Propulsion) as Propulsion;
        this.lighting = factory.getInstance(INSTANCES.Lighting) as Lighting;
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