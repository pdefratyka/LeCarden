import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketAreaComponent } from './basket-area.component';

describe('BasketAreaComponent', () => {
  let component: BasketAreaComponent;
  let fixture: ComponentFixture<BasketAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
