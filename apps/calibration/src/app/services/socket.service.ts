import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import type { Observable } from 'rxjs';
import { shareReplay } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    readonly ws$ = webSocket('wss://bildik.m-tarasov.com/ws');
    // readonly ws$ = webSocket('ws://localhost:3333/ws');
    readonly wsMsg$: Observable<any>;

    constructor() {
        this.wsMsg$ = this.ws$.pipe(shareReplay(1));
        this.wsMsg$.subscribe();
    }

    sendMessage(msg: any) {
        this.ws$.next(msg);
    }
}
