import { NgModule } from '@angular/core';
import { routerReducer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { MergedRouterStateSerializer } from './merged-route-serializer';

export const routerStateConfig = {
    stateKey: 'router'
};

@NgModule({
    imports: [
        StoreModule.forFeature(routerStateConfig.stateKey, routerReducer),
        StoreRouterConnectingModule.forRoot(routerStateConfig)
    ],
    exports: [StoreModule, StoreRouterConnectingModule],
    providers: [
        {
            provide: RouterStateSerializer,
            useClass: MergedRouterStateSerializer
        }
    ]
})
export class NgrxRouterStoreModule {}
