import { ErrorHandler } from "@angular/core";
import { Exception } from "@core/common/exception";
import { NzNotificationService } from "ng-zorro-antd/notification";

export class GlobalErrorHandler implements ErrorHandler {

    constructor(private notification: NzNotificationService) {

    }

    public handleError(error): void {
        if (error instanceof Exception) {
            this._notification(error);
        } else {
            console.error(error);
        }
    }


    private _notification(exception: Exception): void {
        this.notification.create('error', exception.host, exception.message);
    }


}