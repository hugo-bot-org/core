import { WiringPINode } from "../interfaces/wiringpi-node.interface";
import { LightsPinout } from "../interfaces/lights-pinout.interface";
import { ConfigReader } from "../helpers/ConfigReader.helper";

export class Lighting {
    private wpi: WiringPINode;
    private lights: LightsPinout;

    public constructor(wpi: WiringPINode) {
        this.wpi = wpi;
        this.wpi.wiringPiSetupGpio();
        this.lights = ConfigReader.getConfigSync().pins.lights;
        this.setPinModes();
    }

    public setFrontLights(mode: number) {
        if (mode) {
            this.wpi.digitalWrite(this.lights.A, 1);
            this.wpi.digitalWrite(this.lights.B, 1);
            return;
        }

        this.wpi.digitalWrite(this.lights.A, 0);
        this.wpi.digitalWrite(this.lights.B, 0);
    }

    private setPinModes() {
        this.wpi.pinMode(this.lights.A, this.wpi.OUTPUT);
        this.wpi.pinMode(this.lights.B, this.wpi.OUTPUT);
    }
}