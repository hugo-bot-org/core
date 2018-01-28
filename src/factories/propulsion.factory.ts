import { Propulsion } from "../core/Propulsion.core";

import { WPIFactory } from "./wpi.factory";

export class PropulsionFactory {
    private static instance: Propulsion;

    public static resolve(): Propulsion {
        if (!PropulsionFactory.instance) {
            const wpi = WPIFactory.resolve();
            PropulsionFactory.instance = new Propulsion(wpi);
        }

        return PropulsionFactory.instance;
    }

}
