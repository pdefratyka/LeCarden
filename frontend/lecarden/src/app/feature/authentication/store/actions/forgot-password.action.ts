import { Action } from '@ngrx/store';

export const forgotPasswordFeatureName = 'forgot password';

export const remindPasswordActions = {
  REMIND_PASSWORD: `[${forgotPasswordFeatureName}] Reminder`,
  REMIND_PASSWORD_SUCCESS: `[${forgotPasswordFeatureName}] Reminder success`,
  REMIND_PASSWORD_FAIL: `[${forgotPasswordFeatureName}] Reminder fail`,
};

export class RemindPassword implements Action {
  readonly type = remindPasswordActions.REMIND_PASSWORD;
  constructor(public payload: any) {}
}

export class RemindPasswordSuccess implements Action {
  readonly type = remindPasswordActions.REMIND_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}

export class RemindPasswordFail implements Action {
  readonly type = remindPasswordActions.REMIND_PASSWORD_FAIL;
  constructor(public payload: any) {}
}

export type RemindPasswordActions =
  | RemindPassword
  | RemindPasswordSuccess
  | RemindPasswordFail;
