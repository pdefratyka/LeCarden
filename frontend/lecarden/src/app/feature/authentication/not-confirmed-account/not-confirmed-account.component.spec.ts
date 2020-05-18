import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotConfirmedAccountComponent } from './not-confirmed-account.component';

describe('NotConfirmedAccountComponent', () => {
  let component: NotConfirmedAccountComponent;
  let fixture: ComponentFixture<NotConfirmedAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotConfirmedAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotConfirmedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
