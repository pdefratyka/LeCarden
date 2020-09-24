import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketModeSelectorComponent } from './basket-mode-selector.component';

describe('BasketModeSelectorComponent', () => {
  let component: BasketModeSelectorComponent;
  let fixture: ComponentFixture<BasketModeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketModeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketModeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
