import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './feature/authentication/register/register.component';
import { LoginComponent } from './feature/authentication/login/login.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { AddWordComponent } from './feature/word/add-word/add-word.component';
import { DisplayWordComponent } from './feature/word/display-word/display-word.component';
import { AuthGuardService } from './core/services/security/auth-guard.service';
import { AddPacketComponent } from './feature/word/add-packet/add-packet.component';
import { DisplayPacketComponent } from './feature/word/display-packet/display-packet.component';
import { WordsResolverService } from './core/services/resolvers/words-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuardService] },
  { path: 'add-word', component: AddWordComponent },
  {
    path: 'display-word',
    component: DisplayWordComponent,
    resolve: { words: WordsResolverService }
  },
  { path: 'display-packet', component: DisplayPacketComponent },
  {
    path: 'add-packet',
    component: AddPacketComponent,
    resolve: { words: WordsResolverService }
  },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
