import { WPIFactory } from "./wpi.factory";

export class Factory {
    private factories = {
        WPIInstance: new WPIFactory().resolve()
    };

    public constructor() {

    }

    public getInstance(instance: string) {
        const returnInstance = this.factories[instance];
        if (!returnInstance) {
            throw new Error('The factory required does not exists: ' + instance);
        }

        return returnInstance;
    }
}