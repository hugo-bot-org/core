import * as fs from 'fs';
import * as http from 'http';
import * as cors from 'cors';
import * as io from 'socket.io';
import * as sleep from 'sleep';
import * as express from 'express';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import { SocketEventType } from './events/socket-event-type.event';
import { Intercom } from '../core/Intercom.core';
import { PropulsionIntercomEnum } from '../enums/propulsion-intercom.enum';
import { LightingIntercomEnum } from '../enums/lighting-intercom.enum';
import { GLOBAL_KEYS } from '../consts/global-keys.const';
import { Factory } from '../factories/main.factory';
import { INSTANCES } from '../consts/instances.const';
import { Cam } from '../core/Cam.core';
import { CamIntercomEnum } from '../enums/cam-intercom.enum';
import { Base64Encoder } from '../helpers/Base64Encoder.helper';
import { Buzzer } from '../core/Buzzer.core';

export class ServerIO {
    //  Socket and server stuff
    private app = express();
    private serverStarted: boolean;
    private SockIO: SocketIO.Server;
    private HTTPServer: http.Server;
    private sockets: SocketIO.Socket[];

    constructor() {
        this.sockets = [];

        this.createServer();
        this.startSocketHost();

        const factory = global[GLOBAL_KEYS.hugo_factory] as Factory;
        const buzzerInstance = factory.getInstance(INSTANCES.Buzzer) as Buzzer;

        //  Start the listener 
        this.SockIO.on('connection', socket => {
            console.log('a user connected');

            buzzerInstance.buzz([{ last: 100 }, { last: 100 }, { last: 100 }]);
            socket.emit(SocketEventType.client.successfullyConnected);

            socket.on(SocketEventType.motors.FWD, socket => {
                console.log('The user requested motors.fwd');
                Intercom.propulsionIntercom = PropulsionIntercomEnum.FWD;
                buzzerInstance.buzz([{ last: 30 }]);
            });

            socket.on(SocketEventType.motors.BWD, socket => {
                console.log('The user requested motors.bwd');
                Intercom.propulsionIntercom = PropulsionIntercomEnum.BWD;
                buzzerInstance.buzz([{ last: 30 }]);
            });

            socket.on(SocketEventType.motors.LEFT, socket => {
                console.log('The user requested motors.left');
                Intercom.propulsionIntercom = PropulsionIntercomEnum.LEFT;
                buzzerInstance.buzz([{ last: 30 }]);
            });

            socket.on(SocketEventType.motors.RIGHT, socket => {
                console.log('The user requested motors.right');
                Intercom.propulsionIntercom = PropulsionIntercomEnum.RIGHT;
                buzzerInstance.buzz([{ last: 30 }]);
            });

            socket.on(SocketEventType.motors.STOP, socket => {
                console.log('The user requested motors.stop');
                Intercom.propulsionIntercom = PropulsionIntercomEnum.STOP;
                buzzerInstance.buzz([{ last: 30 }]);
            });

            socket.on(SocketEventType.lights.ON, socket => {
                console.log('The user requested lights.on');
                Intercom.lightingIntercom = LightingIntercomEnum.ON;
                buzzerInstance.buzz([{ last: 50 }, { last: 50 }]);
            });

            socket.on(SocketEventType.lights.OFF, socket => {
                console.log('The user requested lights.off');
                Intercom.lightingIntercom = LightingIntercomEnum.OFF;
                buzzerInstance.buzz([{ last: 50 }, { last: 50 }]);
            });
        });
    }

    public start() {
        this.app.use(cors());
        this.HTTPServer.listen(process.env.PORT || 4000, () => {
            console.log(`HTTP Server started on port ${this.HTTPServer.address().port}`);
        });

        this.app.get('/takePic', (req, res) => {
            console.log('The user requested cam.takePic');
            const factory = global[GLOBAL_KEYS.hugo_factory] as Factory;
            const camInstance = factory.getInstance(INSTANCES.Cam) as Cam;
            Intercom.camIntercom = CamIntercomEnum.TAKE_PIC;

            const sub = camInstance.$shotTaken
                .filter(result => !!result)
                .subscribe(() => {
                    console.log('The shot has been succesfully taken');
                    fs.readFile('/home/maxine/pictures/pic.jpg', (err, data) => {
                        console.log('Sending pic via Socket');
                        const pic = Base64Encoder.base64Encode(data);
                        res.json({ img_data: pic });
                        sub.unsubscribe();
                    });
                });

        })
    }

    private createServer() {
        this.HTTPServer = http.createServer(this.app);
    }

    private startSocketHost() {
        this.SockIO = io.listen(this.HTTPServer);
        console.log('SocketIO registered');
    }
}
