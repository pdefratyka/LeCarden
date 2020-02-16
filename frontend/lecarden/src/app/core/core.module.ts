import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/security/token-interceptor.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule]
})
export class CoreModule {}
