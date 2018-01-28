import * as WPI from 'wiringpi-node';

import { WiringPINode } from "../interfaces/wiringpi-node.interface";

export class WPIWrapper {
    private _wpi: WiringPINode;

    public get instance(): WiringPINode {
        return this._wpi;
    }

    public constructor() {
        this._wpi = WPI;
    }
}