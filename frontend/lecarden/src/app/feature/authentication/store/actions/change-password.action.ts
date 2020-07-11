import { Action } from '@ngrx/store';

export const changePasswordFeatureName = 'changePassword';

export const changePasswordActions = {
  CHANGE_PASSWORD: `[${changePasswordFeatureName}] ChangePassword`,
  CHANGE_PASSWORD_SUCCESS: `[${changePasswordFeatureName}] ChangePassword success`,
  CHANGE_PASSWORD_FAIL: `[${changePasswordFeatureName}] ChangePassword fail`,
};

export class ChangePassword implements Action {
  readonly type = changePasswordActions.CHANGE_PASSWORD;
  constructor(public payload: any) {}
}

export class ChangePasswordSuccess implements Action {
  readonly type = changePasswordActions.CHANGE_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}

export class ChangePasswordFail implements Action {
  readonly type = changePasswordActions.CHANGE_PASSWORD_FAIL;
  constructor(public payload: any) {}
}

export type ChangePasswordActions =
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFail;
