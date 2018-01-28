import { WPIFactory } from "./wpi.factory";
import { CamFactory } from "./cam.factory";
import { LightingFactory } from "./lighting.factory";
import { PropulsionFactory } from "./propulsion.factory";

export class Factory {
    private factories = {
        WPI: WPIFactory.resolve(),
        Cam: CamFactory.resolve(),
        Propulsion: PropulsionFactory.resolve(),
        Lighting: LightingFactory.resolve(),
    };

    public getInstance(instance: string) {
        const returnInstance = this.factories[instance];
        if (!returnInstance) {
            throw new Error('The factory required does not exists: ' + instance);
        }

        return returnInstance;
    }
}
