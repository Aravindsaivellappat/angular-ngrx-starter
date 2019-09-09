import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class AccountService {
    constructor(private http: HttpClient) {}

    get(): Observable<HttpResponse<any>> {
        return this.http.get('/api/account', { observe: 'response' });
    }

    save(account): Observable<HttpResponse<any>> {
        return this.http.post('/api/user', account, {
            observe: 'response'
        });
    }
}
