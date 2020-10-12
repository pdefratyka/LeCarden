import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output()
  sidebarDisplay: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  logout: EventEmitter<void> = new EventEmitter<void>();
  @Input()
  userName: string;

  emitLogout(): void {
    this.logout.emit();
  }

  emitChangeSidebarDisplay(): void {
    this.sidebarDisplay.emit();
  }
}
