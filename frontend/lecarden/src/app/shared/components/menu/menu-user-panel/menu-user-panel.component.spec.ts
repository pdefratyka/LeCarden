import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUserPanelComponent } from './menu-user-panel.component';

describe('MenuUserPanelComponent', () => {
  let component: MenuUserPanelComponent;
  let fixture: ComponentFixture<MenuUserPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuUserPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
