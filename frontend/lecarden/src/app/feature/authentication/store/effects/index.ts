import { LoginEffects } from './login.effect';
import { LogoutEffects } from './logout.effect';

export const effects: any[] = [LoginEffects, LogoutEffects];

export * from './login.effect';
export * from './logout.effect';
