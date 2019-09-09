import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MergedRouteReducerState } from './merged-route';
import { routerStateConfig } from './ngrx-router.module';

export const getRouterState = createFeatureSelector<MergedRouteReducerState>(routerStateConfig.stateKey);

export const getMergedRoute = createSelector(
    getRouterState,
    routerState => routerState.state
);
