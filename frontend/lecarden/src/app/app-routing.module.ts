import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './feature/authentication/register/register.component';
import { LoginComponent } from './feature/authentication/login/login.component';
import { ForgotPasswordComponent } from './feature/authentication/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './feature/authentication/change-password/change-password.component';
import { AuthGuardService } from './core/services/security/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./feature/features.module').then((m) => m.FeaturesModule),
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
