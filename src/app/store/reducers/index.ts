import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as auth from './auth/auth.reducer';
import * as account from './account/account.reducer';

export interface AppState {
  authState: auth.State;
  accountState: account.AccountState;
}

export const reducers: ActionReducerMap<any> = {
  auth: auth.reducer,
  account: account.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectAuthState = createFeatureSelector<auth.State>('auth');
export const selectAccountState = createFeatureSelector<account.AccountState>('account');

export const selectAuthentication = createSelector(
  selectAuthState,
  auth.isAuthenticatedSelector
);
