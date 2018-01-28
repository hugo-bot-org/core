import { MotorsPinout } from "../interfaces/motors-pinout.interface";
import { ConfigReader } from "../helpers/ConfigReader.helper";

import { WiringPINode } from "../interfaces/wiringpi-node.interface";
import { Intercom } from './Intercom.core';
import { IntercomAble } from '../interfaces/intercomable.interface';
import { Subscription } from 'rxjs/Subscription';
import { PropulsionIntercomEnum } from '../enums/propulsion-intercom.enum';

export class Propulsion implements IntercomAble {
    private wpi: WiringPINode;
    private motors: MotorsPinout;
    private intercomSubscription: Subscription;

    public constructor(wpi: WiringPINode, useIntercom?: boolean) {
        this.wpi = wpi;
        this.wpi.wiringPiSetupGpio();
        this.motors = ConfigReader.getConfigSync().pins.motors;
        this.setPinModes();
    }

    public useIntercom(value: boolean) {
        if (value && !this.intercomSubscription) {
            this.intercomSubscription = Intercom.$propulsionIntercom
                .do(res => this.handlePropulsionIntercom(res))
                .subscribe();

            return;
        }

        if (!value && !!this.intercomSubscription) {
            this.intercomSubscription.unsubscribe();
        }

        return;
    }

    private handlePropulsionIntercom(data: PropulsionIntercomEnum) {
        if (data === PropulsionIntercomEnum.FWD) {
            this.FWD();
            return;
        }

        if (data === PropulsionIntercomEnum.BWD) {
            this.BWD();
            return;
        }

        if (data === PropulsionIntercomEnum.LEFT) {
            this.LEFT();
            return;
        }

        if (data === PropulsionIntercomEnum.RIGHT) {
            this.RIGHT();
            return;
        }

        if (data === PropulsionIntercomEnum.STOP) {
            this.STOP();
            return;
        }
    }

    public FWD() {
        this.setDriverPower(1);
        this.wpi.digitalWrite(this.motors.A.FWD, 1);
        this.wpi.digitalWrite(this.motors.B.FWD, 1);
    }

    public BWD() {
        this.setDriverPower(1);
        this.wpi.digitalWrite(this.motors.A.BWD, 1);
        this.wpi.digitalWrite(this.motors.B.BWD, 1);
    }

    public STOP() {
        this.setDriverPower(0);
        this.wpi.digitalWrite(this.motors.A.FWD, 0);
        this.wpi.digitalWrite(this.motors.B.FWD, 0);
        this.wpi.digitalWrite(this.motors.A.BWD, 0);
        this.wpi.digitalWrite(this.motors.B.BWD, 0);
    }

    public LEFT() {
        this.setDriverPower(1);
        this.wpi.digitalWrite(this.motors.A.FWD, 1);
        this.wpi.digitalWrite(this.motors.B.BWD, 1);
    }

    public RIGHT() {
        this.setDriverPower(1);
        this.wpi.digitalWrite(this.motors.A.BWD, 1);
        this.wpi.digitalWrite(this.motors.B.FWD, 1);
    }

    private setPinModes() {
        this.wpi.pinMode(12, this.wpi.OUTPUT);
        this.wpi.pinMode(this.motors.driver, this.wpi.OUTPUT);
        this.wpi.pinMode(this.motors.A.FWD, this.wpi.OUTPUT);
        this.wpi.pinMode(this.motors.A.BWD, this.wpi.OUTPUT);
        this.wpi.pinMode(this.motors.B.FWD, this.wpi.OUTPUT);
        this.wpi.pinMode(this.motors.B.BWD, this.wpi.OUTPUT);
    }

    private setDriverPower(state: number) {
        this.wpi.digitalWrite(this.motors.driver, state);

        if (!state) {
            this.wpi.digitalWrite(this.motors.A.FWD, 0);
            this.wpi.digitalWrite(this.motors.A.BWD, 0);
            this.wpi.digitalWrite(this.motors.B.FWD, 0);
            this.wpi.digitalWrite(this.motors.B.BWD, 0);
        }
    }
}
