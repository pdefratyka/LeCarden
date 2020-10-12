import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { TokenService } from 'src/app/core/services/security/token.service';
import * as fromStore from '../authentication/store';
import { Logout } from '../authentication/store';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sidebarDisplay$ = new Subject<void>();
  isToggled = false;
  userName: string;

  constructor(
    private readonly tokenService: TokenService,
    private store: Store<fromStore.LogoutState>
  ) {}

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
