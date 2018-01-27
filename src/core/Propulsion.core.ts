import { MotorsPinout } from "../interfaces/motors-pinout.interface";
import { ConfigReader } from "../helpers/ConfigReader.helper";

export class Propulsion {

    private motors: MotorsPinout;

    public constructor() {
        this.motors = ConfigReader.getConfigSync().pins.motors;
        console.log(this.motors);
    }

}
