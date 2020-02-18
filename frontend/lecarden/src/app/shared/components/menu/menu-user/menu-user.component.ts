import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/security/auth.service';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss']
})
export class MenuUserComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {}

  logout(): void {
    this.authService.logout();
  }
}
