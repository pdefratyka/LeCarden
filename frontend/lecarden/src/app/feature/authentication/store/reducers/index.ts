import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromAuthenticate from './login.reducer';
import * as fromRegister from './register.reducer';
import * as fromLogout from './logout.reducer';

export interface LoginState {
  authenticate: fromAuthenticate.LoginState;
}

export interface RegisterState {
  register: fromRegister.RegisterState;
}

export interface LogoutState {
  logout: fromLogout.LogoutState;
}

export const loginReducers: ActionReducerMap<LoginState> = {
  authenticate: fromAuthenticate.loginReducer,
};

export const registerReducers: ActionReducerMap<RegisterState> = {
  register: fromRegister.registerReducer,
};

export const getLoginState = createFeatureSelector<LoginState>('authenticate');
export const getRegisterState = createFeatureSelector<RegisterState>(
  'register'
);

export const getAuthenticateState = createSelector(
  getLoginState,
  (state: LoginState) => state
);

/*export function clearState(reducer) {
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
}*/
