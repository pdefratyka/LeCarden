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
import { PacketsResolverService } from './core/services/resolvers/packets-resolver.service';
import { SinglePacketResolverService } from './core/services/resolvers/single-packet-resolver.service';
import { CategoriesResolverService } from './core/services/resolvers/categories-resolver.service';
import { LearningModeComponent } from './feature/learning/learning-mode/learning-mode.component';
import { LearningTranslationComponent } from './feature/learning/learning-translation/learning-translation.component';
import { FilteredPacketResolverService } from './core/services/resolvers/filtered-packet-resolver.service';
import { SingleWordResolverService } from './core/services/resolvers/single-word-resolver.service';
import { NotConfirmedAccountComponent } from './feature/authentication/not-confirmed-account/not-confirmed-account.component';
import { ForgotPasswordComponent } from './feature/authentication/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './feature/authentication/change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuardService] },
  {
    path: 'add-word',
    children: [
      {
        path: '',
        component: AddWordComponent,
        resolve: { categories: CategoriesResolverService },
      },
      {
        path: ':id',
        component: AddWordComponent,
        resolve: {
          word: SingleWordResolverService,
        },
      },
    ],
    canActivate: [AuthGuardService],
  },
  {
    path: 'display-word',
    component: DisplayWordComponent,
    resolve: { words: WordsResolverService },
    canActivate: [AuthGuardService],
  },
  {
    path: 'display-packet',
    component: DisplayPacketComponent,
    resolve: { packets: PacketsResolverService },
    canActivate: [AuthGuardService],
  },
  {
    path: 'add-packet',
    children: [
      {
        path: '',
        component: AddPacketComponent,
        resolve: { words: WordsResolverService },
      },
      {
        path: ':id',
        component: AddPacketComponent,
        resolve: {
          packet: SinglePacketResolverService,
          words: WordsResolverService,
        },
      },
    ],
    canActivate: [AuthGuardService],
  },
  {
    path: 'learn',
    children: [
      {
        path: '',
        component: LearningModeComponent,
        resolve: { packets: PacketsResolverService },
      },
      {
        path: 'translation/:id/result/:result-id',
        component: LearningTranslationComponent,
        resolve: { packet: FilteredPacketResolverService },
      },
      {
        path: 'translation',
        component: LearningTranslationComponent,
      },
    ],
    canActivate: [AuthGuardService],
  },
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
