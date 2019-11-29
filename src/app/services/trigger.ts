import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Socket } from '../interfaces';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

declare var io: {
    connect(url: string): Socket;
};

@Injectable({
    providedIn: 'root'
})

export class TriggerService {
    constructor() { }
    socket: Socket;
    observer: Observer<string>;
    checkTrigger(): Observable<string> {
        this.socket = socketIo("http://10.10.114.97:5556", { "flag": true });
        this.socket.on('responseData', () => {
            this.observer.next("");
        });
        return this.createObservable();
    }
    createObservable(): Observable<string> {
        return new Observable<string>(observer => { this.observer = observer; });
    }
}