import { Action } from '@ngrx/store';

export const logoutFeatureName = 'logout';

export const logoutActions = {
  LOGOUT: `[${logoutFeatureName}] Logout`,
  LOGOUT_SUCCESS: `[${logoutFeatureName}] Success`,
};

export class Logout implements Action {
  readonly type = logoutActions.LOGOUT;
  constructor() {
    console.log('Logout');
  }
}

export class LogoutSuccess implements Action {
  readonly type = logoutActions.LOGOUT_SUCCESS;
  constructor() {}
}

export type LogoutActions = Logout | LogoutSuccess;
