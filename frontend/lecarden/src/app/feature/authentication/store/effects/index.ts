import { LoginEffects } from './login.effect';
import { LogoutEffects } from './logout.effect';
import { RegisterEffects } from './register.effect';
import { RemindPasswordEffects } from './forgot-password.effect';
import { ChangePasswordEffects } from './change-password.effect';
import { ConfirmAccountEffects } from './confirm-account.effect';

export const effects: any[] = [
  LoginEffects,
  LogoutEffects,
  RegisterEffects,
  RemindPasswordEffects,
  ChangePasswordEffects,
  ConfirmAccountEffects,
];

export * from './login.effect';
export * from './logout.effect';
export * from './register.effect';
export * from './forgot-password.effect';
export * from './change-password.effect';
export * from './confirm-account.effect';
