import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/core/services/security/auth.service';
import { TokenService } from 'src/app/core/services/security/token.service';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/feature/authentication/store';
import * as fromStore from '../../../feature/authentication/store';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidebar') sidebar: ElementRef;
  isNavbarOppened = false;
  userName: string;
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private store: Store<fromStore.LogoutState>
  ) {}

  ngOnInit(): void {
    this.userName = this.tokenService.getUserName();
  }

  openNav(): void {
    this.sidebar.nativeElement.style.width = '250px';
    if (this.isNavbarOppened) {
      this.sidebar.nativeElement.style.width = '0';
    }
    this.isNavbarOppened = !this.isNavbarOppened;
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  closeNav(): void {
    this.isNavbarOppened = false;
    this.sidebar.nativeElement.style.width = '0';
  }

  logout(): void {
    //this.authService.logout();
    this.store.dispatch(new Logout());
  }
}
