import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { NgrxRouterStoreModule } from './store/reducers/router/ngrx-router.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppEffects } from './app.effects';
import { AppSharedModule } from './shared/shared.module';
import {
    HttpProxyInterceptor,
    AuthInterceptor,
    AuthExpiredInterceptor,
    HttpRequestInterceptor
} from './interceptors';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        NgbModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
        EffectsModule.forRoot([AppEffects]),
        StoreRouterConnectingModule.forRoot(),
        NgrxRouterStoreModule,
        NgxSpinnerModule,

        // Project modules
        AppRoutingModule,
        AppSharedModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpProxyInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
