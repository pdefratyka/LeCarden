import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslationConfigModule } from 'src/app/shared/config/translation-config.module';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './register/register-form/register-form.component';
import { NotConfirmedAccountComponent } from './not-confirmed-account/not-confirmed-account.component';
import { EmailButtonsPanelComponent } from './not-confirmed-account/email-buttons-panel/email-buttons-panel.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordFormComponent } from './forgot-password/forgot-password-form/forgot-password-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordFormComponent } from './change-password/change-password-form/change-password-form.component';
import {
  effects /*clearState*/,
  loginReducers,
  registerReducers,
  forgotPasswordReducers,
  changePasswordReducers,
  confirmAccountReducers,
} from './store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { loginReducer } from './store/reducers/login.reducer';
import { TokenInterceptorService } from 'src/app/core/services/security/token-interceptor.service';
// Calling load to get configuration + translation

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterFormComponent,
    NotConfirmedAccountComponent,
    EmailButtonsPanelComponent,
    ForgotPasswordComponent,
    ForgotPasswordFormComponent,
    ChangePasswordComponent,
    ChangePasswordFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    TranslationConfigModule,
    StoreModule.forFeature('authenticate', loginReducers, {
      //metaReducers: [clearState],
    }),
    StoreModule.forFeature('register', registerReducers, {}),
    StoreModule.forFeature('remindPassword', forgotPasswordReducers, {}),
    StoreModule.forFeature('changePassword', changePasswordReducers, {}),
    StoreModule.forFeature('confirmAccount', confirmAccountReducers, {}),
    EffectsModule.forFeature(effects),
  ],
})
export class AuthenticationModule {}
