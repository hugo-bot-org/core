import * as SLEEP from 'sleep';
import * as WPI from 'wiringpi-node';

export class Test {
    public static testPin23() {
        WPI.wiringPiSetupGpio();
        WPI.pinModeAlt(23, WPI.FSEL_OUTP);

        WPI.digitalWrite(23, 0);
        SLEEP.msleep(500);
        WPI.digitalWrite(23, 1);
    }
}