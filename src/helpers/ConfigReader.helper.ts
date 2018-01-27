import * as fs from 'fs';
import * as path from 'path';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MainConf } from '../interfaces/main-conf.interface';

export class ConfigReader {
    public static getConfigSync(): MainConf {

        const content = fs.readFileSync((global as any).rootDir + 'configs/main.conf.json', 'utf8');
        if (content && JSON.parse(content)) {
            return JSON.parse(content);
        }

        return null;
    }
}