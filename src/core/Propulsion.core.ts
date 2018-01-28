import * as Gpio from 'onoff';

import { MotorsPinout } from "../interfaces/motors-pinout.interface";
import { ConfigReader } from "../helpers/ConfigReader.helper";

import { WiringPINode } from "../interfaces/wiringpi-node.interface";

export class Propulsion {
    private wpi: WiringPINode;
    private motors: MotorsPinout;

    public constructor(wpi: WiringPINode) {
        this.wpi = wpi;
        this.wpi.wiringPiSetupGpio();
        this.motors = ConfigReader.getConfigSync().pins.motors;
        this.setPinModes();
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
        this.wpi.pinMode(this.motors.driver, this.wpi.OUTPUT);
        this.wpi.pinMode(this.motors.A.FWD, this.wpi.OUTPUT);
        this.wpi.pinMode(this.motors.B.FWD, this.wpi.OUTPUT);
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
