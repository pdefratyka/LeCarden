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

// Calling load to get configuration + translation

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    TranslationConfigModule
  ],
  providers: [
    //{
    //provide: HTTP_INTERCEPTORS, These functions should be only there where token is needed
    //useClass: TokenInterceptorService,
    //multi: true
    //}
  ]
})
export class AuthenticationModule {}
