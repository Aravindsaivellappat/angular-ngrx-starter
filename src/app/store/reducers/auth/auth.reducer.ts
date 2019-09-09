import { createReducer, on, Action } from '@ngrx/store';
import AuthActions from '../../actions/auth.actions';

export interface State {
    isAuthenticated: boolean;
    token: any | null;
    error: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    token: null,
    error: null
};

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.LoginSuccess, (state, action) => ({
        ...state,
        isAuthenticated: true,
        token: action.token,
        error: null
    })),
    on(AuthActions.LoginFailure, (state, action) => ({
        ...state,
        isAuthenticated: false,
        token: null,
        error: action.error
    })),
    on(AuthActions.Logout, (state, action) => ({
        ...initialState
    }))
);

export const isAuthenticatedSelector = (state: State) => state.isAuthenticated;

isAuthenticatedSelector(initialState);

