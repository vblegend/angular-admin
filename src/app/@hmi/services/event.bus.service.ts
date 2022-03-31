import { Injectable } from "@angular/core";
import { BasicWidgetComponent } from "@hmi/components/basic-widget/basic.widget.component";
import { EventBusMessage, EventBusMessages } from "@hmi/core/common";
import { Observable, Subject, Subscriber, Subscription, TeardownLogic } from "rxjs";
import { map, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventBusService {
    private _subscriber: Subject<EventBusMessage<any>> = new Subject<EventBusMessage<any>>();


    public get subscriber(): Subject<EventBusMessage<any>> {
        return this._subscriber;
    }

    public subscribeTarget<T>(target: String, next?: (value: EventBusMessage<T>) => void): Subscription {
        return this._subscriber.pipe(
            filter(value => value.identity == null || value.identity === target)
        ).subscribe(next);
    }



    public subscribe<T>(next?: (value: EventBusMessage<T>) => void): Subscription {
        return this._subscriber.subscribe(next);
    }

    public filter<T>(predicate: (value: EventBusMessage<T>, index: number) => boolean): Observable<EventBusMessage<T>> {
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
     * 把事件派遣给指定ID的对象
     * @param target 
     * @param type 
     * @param data 
     */
    public dispatch<T>(target: BasicWidgetComponent, identity: string, type: EventBusMessages, data: T): void {
        const message: EventBusMessage<T> = { target, identity: identity, type, data };
        this._subscriber.next(message);
    }


    /**
     * 把事件广播给所有订阅对象
     * @param type 
     * @param data 
     */
    public broadcast<T>(target: BasicWidgetComponent, type: EventBusMessages, data: T) {
        const message: EventBusMessage<T> = { target, identity: null, type, data };
        this._subscriber.next(message);
    }

}