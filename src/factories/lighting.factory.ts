import { WPIFactory } from "./wpi.factory";

import { Lighting } from "../core/Lighting.core";

export class LightingFactory {
    private static instance: Lighting;

    public static resolve(): Lighting {
        if (!LightingFactory.instance) {
            const wpi = WPIFactory.resolve();
            LightingFactory.instance = new Lighting(wpi);
        }

        return LightingFactory.instance;
    }
}