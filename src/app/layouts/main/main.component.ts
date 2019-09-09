import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, selectAuthentication, selectAuthState } from 'src/app/store/reducers';
import { Observable } from 'rxjs';

@Component({
    selector: 'gl-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    authState$: Observable<any>;
    account: any;

    constructor(private store: Store<AppState>) {
        this.authState$ = this.store.pipe(select(selectAuthentication));
    }

    ngOnInit() {}

    isAuthenticated() {
        if (localStorage.getItem('account')) {
            this.account = localStorage.getItem('account');
            return true;
        } else {
            return false;
        }
    }
}
