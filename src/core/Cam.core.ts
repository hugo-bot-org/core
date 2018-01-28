import * as cp from 'child_process';

import { Subscription } from "rxjs/Subscription";

import { IntercomAble } from "../interfaces/intercomable.interface";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Intercom } from './Intercom.core';
import { CamIntercomEnum } from '../enums/cam-intercom.enum';

export class Cam implements IntercomAble {
    private intercomSubscription: Subscription;
    private _$shotTaken: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public get $shotTaken(): Observable<boolean> {
        return this._$shotTaken.asObservable();
    }

    public useIntercom(value: boolean) {
        if (value && !this.intercomSubscription) {
            this.intercomSubscription = Intercom.$camIntercom
                .do(res => this.handleCamIntercom(res))
                .subscribe();

            return;
        }

        if (!value && !!this.intercomSubscription) {
            this.intercomSubscription.unsubscribe();
        }

        return;
    }

    public takePic(): Observable<boolean> {
        cp.exec('fswebcam /home/maxine/pictures/pic.jpg', (err, stdout, stderr) => {
            this._$shotTaken.next(true);
        });

        return this._$shotTaken.asObservable();
    }

    private handleCamIntercom(data: CamIntercomEnum) {
        if (data === CamIntercomEnum.TAKE_PIC) {
            this.takePic();
        }
    }
}