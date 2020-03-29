import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeginModeComponent } from './foregin-mode.component';

describe('ForeginModeComponent', () => {
  let component: ForeginModeComponent;
  let fixture: ComponentFixture<ForeginModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeginModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeginModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
