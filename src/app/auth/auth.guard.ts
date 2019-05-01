import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {isLoggedIn} from './auth.selector';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store
      .pipe(
        select(isLoggedIn),
        tap((loggedIn: boolean) => {
          if (!loggedIn) {
            this.router.navigateByUrl('/');
          }
        })
      );
  }
}
