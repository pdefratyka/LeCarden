import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MenuUserPanelComponent } from './components/menu/menu-user-panel/menu-user-panel.component';
import { MenuOptionsComponent } from './components/menu/menu-options/menu-options.component';
import { RouterModule } from '@angular/router';
import { MenuSubCategoriesComponent } from './components/menu/menu-options/menu-sub-categories/menu-sub-categories.component';

@NgModule({
  declarations: [MenuComponent, MenuUserPanelComponent, MenuOptionsComponent, MenuSubCategoriesComponent],
  imports: [CommonModule, RouterModule]
})
export class SharedModule {}
