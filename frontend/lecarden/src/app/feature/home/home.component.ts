import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sidebarDisplay$ = new Subject<void>();
  constructor() {}

  ngOnInit(): void {}
  changeSidebarDisplay(): void {
    this.sidebarDisplay$.next();
  }
}
