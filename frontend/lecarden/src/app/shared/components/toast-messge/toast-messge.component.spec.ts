import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastMessgeComponent } from './toast-messge.component';

describe('ToastMessgeComponent', () => {
  let component: ToastMessgeComponent;
  let fixture: ComponentFixture<ToastMessgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastMessgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastMessgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
