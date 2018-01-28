import { WPIFactory } from "./wpi.factory";
import { PropulsionFactory } from "./propulsion.factory";

export class Factory {
    private factories = {
        WPI: WPIFactory.resolve(),
        Propulsion: PropulsionFactory.resolve()
    };

    public getInstance(instance: string) {
        const returnInstance = this.factories[instance];
        if (!returnInstance) {
            throw new Error('The factory required does not exists: ' + instance);
        }

        return returnInstance;
    }
}
