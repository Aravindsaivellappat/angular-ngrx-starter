import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map, catchError, mergeMap, exhaustMap, tap } from 'rxjs/operators';
import { AccountService } from 'src/app/shared';
import AccountActions from '../actions/account.actions';

@Injectable()
export class AccountEffects {
    constructor(private actions$: Actions, private router: Router, private accountService: AccountService) {}

    accountFetch$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AccountActions.FetchAccount),
            mergeMap(
                (action): Observable<any> => {
                    return this.accountService.get().pipe(
                        map(account =>
                            AccountActions.AccountFetchSuccess({
                                user: account.body
                            })
                        ),
                        catchError(error => of(AccountActions.AccountFetchFailure({ error })))
                    );
                }
            )
        );
    });

    accountFetchSuccess$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AccountActions.AccountFetchSuccess),
                tap(user => {
                    localStorage.setItem('account', JSON.stringify(user.user));
                    this.router.navigate(['milestones']);
                })
            );
        },
        { dispatch: false }
    );
}
