import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/security/token-interceptor.service';
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
  ],
  providers: [
    //{
    //provide: HTTP_INTERCEPTORS, These functions should be only there where token is needed
    //useClass: TokenInterceptorService,
    //multi: true
    //}
  ],
})
export class AuthenticationModule {}
