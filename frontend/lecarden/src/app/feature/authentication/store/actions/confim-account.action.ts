import { Action } from '@ngrx/store';

export const confirmAccountFeatureName = 'confirmAccount';

export const confirmAccountActions = {
  CONFIRM_ACCOUNT: `[${confirmAccountFeatureName}] ConfirmAccount`,
  CONFIRM_ACCOUNT_SUCCESS: `[${confirmAccountFeatureName}] ConfirmAccount success`,
  CONFIRM_ACCOUNT_FAIL: `[${confirmAccountFeatureName}] ConfirmAccount fail`,
};

export class ConfirmAccount implements Action {
  readonly type = confirmAccountActions.CONFIRM_ACCOUNT;
  constructor(public payload: any) {}
}

export class ConfirmAccountSuccess implements Action {
  readonly type = confirmAccountActions.CONFIRM_ACCOUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class ConfirmAccountFail implements Action {
  readonly type = confirmAccountActions.CONFIRM_ACCOUNT_FAIL;
  constructor(public payload: any) {}
}

export type ConfirmAccountActions =
  | ConfirmAccount
  | ConfirmAccountSuccess
  | ConfirmAccountFail;
