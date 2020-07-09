import { Action } from '@ngrx/store';

export const registerFeatureName = 'register';

export const registerActions = {
  REGISTER: `[${registerFeatureName}] Register`,
  REGISTER_SUCCESS: `[${registerFeatureName}] Register success`,
  REGISTER_FAIL: `[${registerFeatureName}] Register fail`,
};

export class Register implements Action {
  readonly type = registerActions.REGISTER;
  constructor(public payload: any) {
    //console.log(payload);
  }
}

export class RegisterSuccess implements Action {
  readonly type = registerActions.REGISTER_SUCCESS;
  constructor(public payload: any) {}
}

export class RegisterFail implements Action {
  readonly type = registerActions.REGISTER_FAIL;
  constructor(public payload: any) {}
}

export type RegisterActions = Register | RegisterSuccess | RegisterFail;
