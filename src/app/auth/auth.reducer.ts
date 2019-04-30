import {AuthActions, AuthActionTypes} from './auth.actions';
import {User} from '../model/user.model';


export interface AuthState {
  loggedIn: boolean;
  user: User;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined
};

export function reducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return Object.assign({}, state, {loggedIn: true, user: action.payload.user});

    case AuthActionTypes.LogoutAction:
      return initialAuthState;

    default: return state;
  }
}
