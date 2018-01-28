import * as sleep from 'system-sleep';

import { Subscription } from "rxjs/Subscription";
import { Intercom } from "./Intercom.core";

import { BuzzerIntercomEnum } from "../enums/buzzer-intercom.enum";

import { BuzzerBuzz } from "../interfaces/buzzer-buzz.interface";
import { IntercomAble } from "../interfaces/intercomable.interface";
import { BuzzerPinout } from "../interfaces/buzzer-pinout.interface";
import { WiringPINode } from "../interfaces/wiringpi-node.interface";
import { ConfigReader } from "../helpers/ConfigReader.helper";

export class Buzzer implements IntercomAble {
    private wpi: WiringPINode;
    private buzzer: BuzzerPinout;
    private intercomSubscription: Subscription;
    private buzzs = 0;

    public constructor(wpi: WiringPINode) {
        this.wpi = wpi;
        this.wpi.wiringPiSetupGpio();
        this.buzzer = ConfigReader.getConfigSync().pins.buzzer;
        this.setPinModes();
    }

    public useIntercom(value: boolean) {
        if (value && !this.intercomSubscription) {
            this.intercomSubscription = Intercom.$buzzerIntercom
                .do(res => this.handleBuzzerIntercom(res))
                .subscribe();

            return;
        }

        if (!value && !!this.intercomSubscription) {
            this.intercomSubscription.unsubscribe();
        }

        return;
    }

    public buzz(buzzs: BuzzerBuzz[]) {
        buzzs.forEach(buzz => {
            this.wpi.digitalWrite(this.buzzer.buzzer, 1);
            sleep(buzz.last);
            this.wpi.digitalWrite(this.buzzer.buzzer, 0);
            sleep(buzz.pause ? buzz.pause : buzz.last);
        });
    }

    private handleBuzzerIntercom(data: BuzzerIntercomEnum) {

    }

    private setPinModes() {
        this.wpi.pinMode(this.buzzer.buzzer, this.wpi.OUTPUT);
    }
}