import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { CamIntercomEnum } from "../enums/cam-intercom.enum";
import { LightingIntercomEnum } from "../enums/lighting-intercom.enum";
import { PropulsionIntercomEnum } from "../enums/propulsion-intercom.enum";

export class Intercom {
    private static _$propulsionIntercom: BehaviorSubject<PropulsionIntercomEnum> = new BehaviorSubject(null);
    private static _$lightingIntercom: BehaviorSubject<LightingIntercomEnum> = new BehaviorSubject(null);
    private static _$camIntercom: BehaviorSubject<CamIntercomEnum> = new BehaviorSubject(null);


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

    public static get $camIntercom(): Observable<CamIntercomEnum> {
        return this._$camIntercom.asObservable();
    }

    public static set camIntercom(value: CamIntercomEnum) {
        this._$camIntercom.next(value);
    }
}