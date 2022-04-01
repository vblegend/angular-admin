import { Injectable } from "@angular/core";
import { BasicWidgetComponent } from "@hmi/components/basic-widget/basic.widget.component";
import { EventMessage, EventMessageData, MessageTypes } from "@hmi/core/common";
import { Observable, Subject, Subscriber, Subscription, TeardownLogic } from "rxjs";
import { map, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventBusService {
    private _subscriber: Subject<EventMessage> = new Subject<EventMessage>();


    public get subscriber(): Subject<EventMessage> {
        return this._subscriber;
    }

    public subscribe(next?: (value: EventMessage) => void): Subscription {
        return this._subscriber.subscribe(next);
    }

    public filter(predicate: (value: EventMessage, index: number) => boolean): Observable<EventMessage> {
        return this._subscriber.pipe(filter(predicate, this));
    }

    /**
     *
     */
    constructor() {
        this._subscriber = new Subject();
        console.log('new EventBusService');
    }

    /**
     * 把事件派遣给指定ID的对象 type: MessageTypes, sender: BasicWidgetComponent, receiver: string, data: EventMessageData
     * @param target 
     * @param type 
     * @param data 
     */
    public dispatch(message: EventMessage): void {
        this._subscriber.next(message);
    }

}