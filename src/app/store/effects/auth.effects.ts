import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import AuthActions from '../actions/auth.actions';
import AccountActions from '../actions/account.actions';
import { AuthServiceProvider } from 'src/app/shared';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private authService: AuthServiceProvider
    ) {}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.Login),
            exhaustMap(
                (action): Observable<any> => {
                    return this.authService.login(action.credentials).pipe(
                        map(token => AuthActions.LoginSuccess({ token })),
                        catchError(error => of(AuthActions.LoginFailure({ error })))
                    );
                }
            )
        );
    });

    loginSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LoginSuccess),
            map(() => AccountActions.FetchAccount())
        );
    });

    logout$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.Logout),
                tap(() => {
                    localStorage.clear();
                    this.router.navigate(['']);
                })
            );
        },
        { dispatch: false }
    );
}
