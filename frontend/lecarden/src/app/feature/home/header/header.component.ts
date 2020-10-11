import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/core/services/security/token.service';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/feature/authentication/store';
import * as fromStore from '../../authentication/store';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output()
  sidebarDisplay: EventEmitter<void> = new EventEmitter<void>();
  userName: string;

  constructor(
    private readonly tokenService: TokenService,
    private store: Store<fromStore.LogoutState>
  ) {}

  ngOnInit(): void {
    this.userName = this.tokenService.getUserName();
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }

  emitChangeSidebarDisplay(): void {
    this.sidebarDisplay.emit();
  }
}
