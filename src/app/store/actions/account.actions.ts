import { createAction, props } from '@ngrx/store';

export const FetchAccount = createAction('[Account] Fetch Account');

export const AccountFetchSuccess = createAction('[Account] Account Fetch Success', props<{ user: any }>());

export const AccountFetchFailure = createAction('[Account] Account Fetch Failure', props<{ error: any }>());

export default {
    FetchAccount,
    AccountFetchSuccess,
    AccountFetchFailure
};
