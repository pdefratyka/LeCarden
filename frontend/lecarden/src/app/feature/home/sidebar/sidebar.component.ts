import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TabName } from '../models/tabName';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('sidebar') sidebar: ElementRef;
  @Input()
  isSidebarDisplayed$: Subject<void>;
  @Input()
  currentTab: TabName;
  selectedTab = -1;
  isNavbarOppened = true;
  TabName: TabName;

  constructor(private readonly router: Router) {}
  ngOnDestroy(): void {
    this.isSidebarDisplayed$.complete();
  }

  ngOnInit(): void {
    this.initToglling();
  }

  selectTab(url: string): void {
    this.router.navigate([url]);
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

  private initToglling(): void {
    this.isSidebarDisplayed$.subscribe((e) => {
      if (this.isNavbarOppened) {
        this.closeNav();
      } else {
        this.openNav();
      }
    });
  }
}
