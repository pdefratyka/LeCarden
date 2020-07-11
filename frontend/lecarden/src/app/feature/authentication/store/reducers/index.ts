import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromAuthenticate from './login.reducer';
import * as fromRegister from './register.reducer';
import * as fromLogout from './logout.reducer';
import * as fromForgotPassword from './forgot-password.reducer';
import * as fromChangePassword from './change-password.reducer';

export interface LoginState {
  authenticate: fromAuthenticate.LoginState;
}

export interface RegisterState {
  register: fromRegister.RegisterState;
}

export interface RemindPasswordState {
  remindPassword: fromForgotPassword.RemindPasswordState;
}

export interface ChangePasswordState {
  changePassword: fromChangePassword.ChangePasswordState;
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

export const forgotPasswordReducers: ActionReducerMap<RemindPasswordState> = {
  remindPassword: fromForgotPassword.remindPasswordReducer,
};

export const changePasswordReducers: ActionReducerMap<ChangePasswordState> = {
  changePassword: fromChangePassword.changePasswordReducer,
};

export const getLoginState = createFeatureSelector<LoginState>('authenticate');
export const getRegisterState = createFeatureSelector<RegisterState>(
  'register'
);

export const getRemindPasswordState = createFeatureSelector<
  RemindPasswordState
>('remindPassword');

export const getChangePasswordState = createFeatureSelector<
  ChangePasswordState
>('changePassword');

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
