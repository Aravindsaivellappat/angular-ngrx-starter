import { createAction, props } from '@ngrx/store';
import { Credentials } from 'src/app/shared';

export const Login = createAction('[Auth] Login', props<{ credentials: Credentials }>());

export const LoginSuccess = createAction('[Auth] Login Success', props<{ token: any }>());

export const LoginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const Logout = createAction('[Auth] Logout');

export const GetStatus = createAction('[Auth] Get Account Status');

export default {
    Login,
    LoginSuccess,
    LoginFailure,
    Logout,
    GetStatus
};
