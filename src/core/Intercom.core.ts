import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { LightingIntercomEnum } from "../enums/lighting-intercom.enum";
import { PropulsionIntercomEnum } from "../enums/propulsion-intercom.enum";

export class Intercom {
    private static _$propulsionIntercom: BehaviorSubject<PropulsionIntercomEnum> = new BehaviorSubject(null);
    private static _$lightingIntercom: BehaviorSubject<LightingIntercomEnum> = new BehaviorSubject(null);


    public static get $propulsionIntercom(): Observable<PropulsionIntercomEnum> {
        return this._$propulsionIntercom.asObservable();
    }

    public static set propulsionIntercom(value: PropulsionIntercomEnum) {
        this._$propulsionIntercom.next(value);
    }

    public static get $lightingIntercom(): Observable<LightingIntercomEnum> {
        return this._$lightingIntercom.asObservable();
    }

    public static set lightingIntercom(value: LightingIntercomEnum) {
        this._$lightingIntercom.next(value);
    }
}