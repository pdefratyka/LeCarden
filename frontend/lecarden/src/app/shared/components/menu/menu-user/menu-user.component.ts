import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/security/auth.service';
import { TokenService } from 'src/app/core/services/security/token.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../feature/authentication/store';
import { Logout } from '../../../../feature/authentication/store';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss'],
})
export class MenuUserComponent implements OnInit {
  userName: string;

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private store: Store<fromStore.LogoutState>
  ) {}

  ngOnInit() {
    this.userName = this.tokenService.getUserName();
  }

  logout(): void {
    //this.authService.logout();
    this.store.dispatch(new Logout());
  }
}
