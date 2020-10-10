import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/core/services/security/auth.service';
import { TokenService } from 'src/app/core/services/security/token.service';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/feature/authentication/store';
import * as fromStore from '../authentication/store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidebar') sidebar: ElementRef;
  isNavbarOppened = true;
  userName: string;
  selectedTab = -1;
  constructor(
    private readonly tokenService: TokenService,
    private store: Store<fromStore.LogoutState>,
    private readonly router: Router
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

  closeNav(): void {
    this.isNavbarOppened = false;
    this.sidebar.nativeElement.style.width = '0';
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }

  selectTab(url: string, tabNumber: number): void {
    this.router.navigate([url]);
    this.selectedTab = tabNumber;
  }
}
