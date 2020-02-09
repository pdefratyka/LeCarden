import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './feature/authentication/register/register.component';
import { LoginComponent } from './feature/authentication/login/login.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { AddWordComponent } from './feature/word/add-word/add-word.component';
import { DisplayWordComponent } from './feature/word/display-word/display-word.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'add-word', component: AddWordComponent },
  { path: 'display-word', component: DisplayWordComponent },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
