import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { getBaseUrl } from '../util/environment.config';
import { Credentials } from '../dto/credentials.model';

@Injectable()
export class AuthServiceProvider {
    private base_url = getBaseUrl();

    constructor(private http: HttpClient) {}

    getToken() {
        return sessionStorage.getItem('authenticationToken') || localStorage.getItem('authenticationToken');
    }

    storeAuthenticationToken(jwt, rememberMe) {
        if (rememberMe) {
            localStorage.setItem('authenticationToken', jwt);
        } else {
            sessionStorage.setItem('authenticationToken', jwt);
        }
    }

    login(credentials: Credentials): Observable<any> {
        return this.http
            .post('/api/authenticate', credentials, { observe: 'response' })
            .pipe(map(authenticationSuccess.bind(this)));

        function authenticationSuccess(req) {
            const token = req.body.id_token;
            this.storeAuthenticationToken(token, credentials.rememberMe);
            return token;
        }
    }

    loginWithToken(jwt, rememberMe) {
        if (jwt) {
            this.storeAuthenticationToken(jwt, rememberMe);
            return Promise.resolve(jwt);
        } else {
            return Promise.reject('Error authenticating with token');
        }
    }

    logout(): Observable<any> {
        return new Observable(ob => {
            // this.http.get('/api/logout', { observe: 'response' }).subscribe(() => {
            localStorage.removeItem('authenticationToken');
            localStorage.removeItem('account');
            sessionStorage.removeItem('authenticationToken');
            ob.complete();
            // });
        });
    }
}
