import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MenuOptionsComponent } from './components/menu/menu-options/menu-options.component';
import { RouterModule } from '@angular/router';
import { MenuUserComponent } from './components/menu/menu-user/menu-user.component';

@NgModule({
  declarations: [MenuComponent, MenuOptionsComponent, MenuUserComponent],
  imports: [CommonModule, RouterModule],
  exports: [MenuComponent]
})
export class SharedModule {}
