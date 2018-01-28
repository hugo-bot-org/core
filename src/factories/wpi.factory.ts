import { WPIWrapper } from "../core/WPIWrapper.core";

import { WiringPINode } from "../interfaces/wiringpi-node.interface";

export class WPIFactory {
    private static instance: WiringPINode;

    public static resolve(): WiringPINode {
        if (!WPIFactory.instance) {
            WPIFactory.instance = new WPIWrapper().instance;
        }

        return WPIFactory.instance;
    }
}
