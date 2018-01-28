import { WPIFactory } from "./wpi.factory";

import { Buzzer } from "../core/Buzzer.core";

export class BuzzerFactory {
    private static instance: Buzzer;

    public static resolve(): Buzzer {
        if (!BuzzerFactory.instance) {
            const wpi = WPIFactory.resolve();
            BuzzerFactory.instance = new Buzzer(wpi);
        }

        return BuzzerFactory.instance;
    }
}