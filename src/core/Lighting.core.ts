import { WiringPINode } from "../interfaces/wiringpi-node.interface";
import { LightsPinout } from "../interfaces/lights-pinout.interface";
import { ConfigReader } from "../helpers/ConfigReader.helper";
import { IntercomAble } from "../interfaces/intercomable.interface";
import { Subscription } from "rxjs/Subscription";
import { Intercom } from "./Intercom.core";
import { LightingIntercomEnum } from "../enums/lighting-intercom.enum";

export class Lighting implements IntercomAble {
    private wpi: WiringPINode;
    private lights: LightsPinout;
    private intercomSubscription: Subscription;

    public constructor(wpi: WiringPINode) {
        this.wpi = wpi;
        this.wpi.wiringPiSetupGpio();
        this.lights = ConfigReader.getConfigSync().pins.lights;
        this.setPinModes();
    }

    public useIntercom(value: boolean) {
        if (value && !this.intercomSubscription) {
            this.intercomSubscription = Intercom.$lightingIntercom
                .do(res => this.handleLightingIntercom(res))
                .subscribe();

            return;
        }

        if (!value && !!this.intercomSubscription) {
            this.intercomSubscription.unsubscribe();
        }

        return;
    }

    private handleLightingIntercom(data: LightingIntercomEnum) {
        if (data === LightingIntercomEnum.ON) {
            this.setFrontLights(1);
            return;
        }

        this.setFrontLights(0);
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