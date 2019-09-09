import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getBaseUrl } from '../shared/util/environment.config';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpProxyInterceptor implements HttpInterceptor {
    private base_url = getBaseUrl();

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const proxyReq = request.clone({ url: `${this.base_url}${request.url}` });
        return next.handle(proxyReq);
    }
}
