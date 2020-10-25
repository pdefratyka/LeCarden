import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './feature/authentication/register/register.component';
import { LoginComponent } from './feature/authentication/login/login.component';
import { ForgotPasswordComponent } from './feature/authentication/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './feature/authentication/change-password/change-password.component';
import { NotConfirmedAccountComponent } from './feature/authentication/not-confirmed-account/not-confirmed-account.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/features.module').then((m) => m.FeaturesModule),
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'not-confirmed-account',
    component: NotConfirmedAccountComponent,
  },
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
