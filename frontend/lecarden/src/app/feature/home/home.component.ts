import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { TokenService } from 'src/app/core/services/security/token.service';
import * as fromStore from '../authentication/store';
import { Logout } from '../authentication/store';
import { getCurrentTab, TabPageAction } from '../store';
import { TabName } from './models/tabName';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sidebarDisplay$ = new Subject<void>();
  isToggled = false;
  userName: string;
  currentTab$: Observable<TabName>;
  constructor(
    private readonly tokenService: TokenService,
    private store: Store
  ) {
    this.currentTab$ = this.store.select(getCurrentTab);
  }

  ngOnInit(): void {
    this.userName = this.tokenService.getUserName();
  }

  changeSidebarDisplay(): void {
    this.sidebarDisplay$.next();
    this.isToggled = !this.isToggled;
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
