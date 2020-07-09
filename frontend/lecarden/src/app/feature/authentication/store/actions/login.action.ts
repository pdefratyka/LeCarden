import { Action } from '@ngrx/store';

export const loginFeatureName = 'login';

export const loginActions = {
  AUTHENTICATE: `[${loginFeatureName}] Authenticate`,
  AUTHENTICATE_SUCCESS: `[${loginFeatureName}] Authenticate success`,
  AUTHENTICATE_FAIL: `[${loginFeatureName}] Authenticate fail`,
};

export class Authenticate implements Action {
  readonly type = loginActions.AUTHENTICATE;
  constructor(public payload: any) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = loginActions.AUTHENTICATE_SUCCESS;
  constructor(public payload: any) {}
}

export class AuthenticateFail implements Action {
  readonly type = loginActions.AUTHENTICATE_FAIL;
  constructor(public payload: any) {}
}

export type LoginActions =
  | Authenticate
  | AuthenticateSuccess
  | AuthenticateFail;
