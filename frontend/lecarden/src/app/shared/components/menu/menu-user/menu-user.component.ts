import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/security/auth.service';
import { TokenService } from 'src/app/core/services/security/token.service';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss']
})
export class MenuUserComponent implements OnInit {
  userName: string;
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  ngOnInit() {
    this.userName = this.tokenService.getUserName();
  }

  logout(): void {
    this.authService.logout();
  }
}
