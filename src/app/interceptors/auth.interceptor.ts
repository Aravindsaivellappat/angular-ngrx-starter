import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (
            !request ||
            !request.url ||
            (/^http/.test(request.url) &&
                !(environment.server_url && request.url.startsWith(environment.server_url)))
        ) {
            return next.handle(request);
        }

        const token =
            localStorage.getItem('authenticationToken') ||
            sessionStorage.getItem('authenticationToken');
        if (!!token) {
            request = request.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                })
            });
        }
        return next.handle(request);
    }
}
