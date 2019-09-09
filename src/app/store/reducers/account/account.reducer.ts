import { createReducer, on, Action } from '@ngrx/store';
import AccountActions from '../../actions/account.actions';

export interface AccountState {
    user: null;
    isAuthenticated: boolean | null;
    error: any;
}

export const initalState: AccountState = {
    user: null,
    isAuthenticated: false,
    error: null
};

export function reducer(state: AccountState | undefined, action: Action) {
    return accountReducer(state, action);
}

export const accountReducer = createReducer(
    initalState,
    on(AccountActions.AccountFetchSuccess, (state, action) => ({
        ...state,
        user: action.user,
        isAuthenticated: true
    }))
);
