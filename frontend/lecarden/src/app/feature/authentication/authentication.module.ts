import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/security/token-interceptor.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
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
