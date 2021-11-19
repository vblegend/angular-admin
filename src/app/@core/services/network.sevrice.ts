import { Injectable } from '@angular/core';
import { Exception } from '../common/exception';


export interface WebSocketTask {
    tickcount: number;
    timeout: number;
    resolve: (data: any) => void;
    rejects: (data: any) => void;
}
export interface WebSocketMessage<T> {
    sn: number;
    method: string;
    data: T;
}


@Injectable({
    providedIn: 'root'
})
export class NetWorkService {

    private webSocket: WebSocket;
    private serialNumber: number;
    private tasklist: Map<number, WebSocketTask>;
    public timeout = 120000;

    constructor() {
        this.serialNumber = 0;
        this.tasklist = new Map();
    }

    private getSerialNumber(): number {
        this.serialNumber++;
        return this.serialNumber;
    }




    private connection() {

        if (this.webSocket) {
            if (this.webSocket.readyState === WebSocket.OPEN) return;
            if (this.webSocket.readyState === WebSocket.CONNECTING) {
                this.close();
            }
            this.webSocket = null;
        }


        // this.webSocket.readyState
        // WebSocket.CONNECTING
        // WebSocket.OPEN
        // WebSocket.CLOSING
        // WebSocket.CLOSED
        this.webSocket = new WebSocket('ws://localhost:8080');
        this.webSocket.onerror = this.socket_error.bind(this);
        this.webSocket.onclose = this.socket_closed.bind(this);
        this.webSocket.onopen = this.socket_opend.bind(this);
        this.webSocket.onmessage = this.socket_message.bind(this);


    }



    /**
     * 
     * @param method 
     * @param data 
     * @param timeout  default = 120000
     * @returns 
     */
    public async send<D, T>(method: string, data: D, timeout?: number): Promise<T> {
        const sn = this.getSerialNumber();
        if (timeout == null) timeout = this.timeout;
        const promise = new Promise<T>((resolve, rejects) => {
            if (this.webSocket == null) return rejects(Exception.build('websocket is not initialized!'));
            if (this.webSocket.readyState != WebSocket.OPEN) return rejects(Exception.build('websocket is not connected!'));
            const task: WebSocketTask = { tickcount: this.tickCount, resolve, rejects, timeout };
            this.tasklist.set(sn, task);
            const message: WebSocketMessage<D> = { sn, method, data };
            this.webSocket.send(JSON.stringify(message));
        });
        return promise;
    }


    private socket_message(socket: WebSocket, ev: MessageEvent): void {
        if (typeof ev.data != 'string') return;
        const message: WebSocketMessage<any> = JSON.parse(ev.data);
        if (message.sn == null) return;
        const task = this.tasklist.get(message.sn);
        if (task) {
            this.tasklist.delete(message.sn);
            task.resolve(message.data);
        }
    }

    private get tickCount(): number {
        return (typeof performance === 'undefined' ? Date : performance).now();
    }





    public get isConnect(): boolean {
        return this.webSocket && this.webSocket.readyState === WebSocket.OPEN;
    }



    private close(): void {
        if (this.webSocket) {
            if (this.webSocket.readyState === WebSocket.OPEN || this.webSocket.readyState === WebSocket.CONNECTING) {
                this.webSocket.close();
            }
            this.webSocket = null;
        }
    }




    private socket_opend(socket: WebSocket, ev: Event): void {

    }

    private socket_closed(socket: WebSocket, ev: CloseEvent): void {
        var code = ev.code;
        var reason = ev.reason;
        var wasClean = ev.wasClean;

    }

    private socket_error(socket: WebSocket, ev: Event): void {

    }




}
