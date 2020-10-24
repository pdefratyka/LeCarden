import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesResolverService } from '../core/services/resolvers/categories-resolver.service';
import { FilteredPacketResolverService } from '../core/services/resolvers/filtered-packet-resolver.service';
import { PacketsResolverService } from '../core/services/resolvers/packets-resolver.service';
import { SinglePacketResolverService } from '../core/services/resolvers/single-packet-resolver.service';
import { WordsResolverService } from '../core/services/resolvers/words-resolver.service';
import { AuthGuardService } from '../core/services/security/auth-guard.service';
import { NotConfirmedAccountComponent } from './authentication/not-confirmed-account/not-confirmed-account.component';
import { HomeComponent } from './home/home.component';
import { LearningModeComponent } from './learning/learning-mode/learning-mode.component';
import { LearningTranslationComponent } from './learning/learning-translation/learning-translation.component';
import { AddPacketComponent } from './word/add-packet/add-packet.component';
import { AddWordComponent } from './word/add-word/add-word.component';
import { DisplayPacketComponent } from './word/display-packet/display-packet.component';
import { DisplayWordComponent } from './word/display-word/display-word.component';

const featureRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent,
    children: [
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
          },
        ],
      },
      {
        path: 'display-word',
        component: DisplayWordComponent,
        resolve: { words: WordsResolverService },
      },
      {
        path: 'display-packet',
        component: DisplayPacketComponent,
        resolve: { packets: PacketsResolverService },
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
      },
      {
        path: 'not-confirmed-account',
        component: NotConfirmedAccountComponent,
      },
      { path: '**', redirectTo: 'login' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(featureRoutes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
