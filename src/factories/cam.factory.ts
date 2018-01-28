import { WPIFactory } from "./wpi.factory";

import { Cam } from "../core/Cam.core";

export class CamFactory {
    private static instance: Cam;

    public static resolve(): Cam {
        if (!CamFactory.instance) {
            CamFactory.instance = new Cam();
        }

        return CamFactory.instance;
    }
}