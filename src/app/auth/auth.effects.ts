import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {defer, Observable, of} from 'rxjs';
import {AuthActionTypes, LoginAction, LogoutAction} from './auth.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Action} from '@ngrx/store';


@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  login$: Observable<LoginAction> = this.actions$
    .pipe(
      ofType<LoginAction>(AuthActionTypes.LoginAction),
      tap((action: LoginAction) => localStorage.setItem('authUser', JSON.stringify(action.payload.user)))
    );

  @Effect({dispatch: false})
  logout$: Observable<LogoutAction> = this.actions$
    .pipe(
      ofType<LogoutAction>(AuthActionTypes.LogoutAction),
      tap(() => {
        localStorage.removeItem('authUser');

        this.router.navigateByUrl('/');
      })
    );

  @Effect()
  init$: Observable<Action> = defer(() => {
    const authUser = localStorage.getItem('authUser');

    return of(authUser ? new LoginAction({user: JSON.parse(authUser)}) : new LogoutAction());
  });

  constructor(private actions$: Actions, private router: Router) {}
}
