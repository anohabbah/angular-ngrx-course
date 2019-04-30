import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './reducers';
import {LogoutAction} from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(new LogoutAction());
  }
}
