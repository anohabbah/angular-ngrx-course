import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {LoginAction} from '../auth.actions';
import {noop} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from '../../model/user.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {}

  login() {
    const {email, password} = this.form.value;
    this.auth
      .login(email, password)
      .pipe(
        tap((user: User) => {
          this.store.dispatch(new LoginAction({user}));
          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(
        noop,
        () => alert('hi hi')
      );
  }


}
