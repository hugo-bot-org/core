import { Factory } from "../interfaces/factory.interface";
import { WPIInstance } from "../core/GPIO.core";

export class WPIFactory implements Factory {
    public instance: WPIInstance;

    public resolve(): WPIInstance {
        if (!this.instance) {
            this.instance = new WPIInstance();
        }

        return this.instance;
    }
}