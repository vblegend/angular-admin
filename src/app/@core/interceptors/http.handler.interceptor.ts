/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class HttpHandlerInterceptor implements HttpInterceptor {

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = this.handleRequest(req);
        return next.handle(req).pipe(
            mergeMap(evt => this.handleResponse(evt)),
            catchError((error: HttpErrorResponse) => {
                this.handleError(error);
                return throwError(() => error);
            })
        );
    }

    /**
     * 请求参数拦截处理
     */
    public handleRequest(req: HttpRequest<any>): HttpRequest<any> {
        console.log(`拦截器A在请求发起前的拦截处理`);
        return req.clone({ setHeaders: { Authorization: 'token:123456' } });
    }


    /**
     * 返回结果拦截处理
     */
    public handleResponse(evt: HttpEvent<any>): Observable<HttpEvent<any>> {
        return new Observable<HttpEvent<any>>(observer => {
            if (evt instanceof HttpResponse) {
                console.log("拦截器A在数据返回后的拦截处理");

            } else {
                console.log(`拦截器A接收到请求发出状态：${evt}`);
            }
            observer.next(evt);
        });
    }
    /**
     * 返回结果拦截处理
     */
    public handleError(error: HttpErrorResponse): void {

        switch (error.status) {
            case 401: // Unauthorized
                // todo

                break;
            case 403: // Forbidden
                // todo
                break;
            case 404: // Forbidden
                // todo
                console.log(error);
                break;

            default:
            // todo
        }
    }
}