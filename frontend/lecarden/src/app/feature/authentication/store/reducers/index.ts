import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromAuthenticate from './login.reducer';
import * as fromLogout from './logout.reducer';
import { logoutActions, loginActions } from '../actions';

export interface LoginState {
  authenticate: fromAuthenticate.LoginState;
}
export interface LogoutState {
  logout: fromLogout.LogoutState;
}
export const reducers: ActionReducerMap<LoginState> = {
  authenticate: fromAuthenticate.loginReducer,
};

export const getLoginState = createFeatureSelector<LoginState>('authenticate');

export const getAuthenticateState = createSelector(
  getLoginState,
  (state: LoginState) => state.authenticate
);

export function clearState(reducer) {
  console.log('Clear state');
  return function (state, action) {
    if (
      action.type === logoutActions.LOGOUT ||
      action.type === loginActions.AUTHENTICATE_FAIL
    ) {
      console.log('logout or auth clear state');
      state = undefined;
    }

    return reducer(state, action);
  };
}
