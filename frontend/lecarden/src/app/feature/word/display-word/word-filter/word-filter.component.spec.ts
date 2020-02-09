import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordFilterComponent } from './word-filter.component';

describe('WordFilterComponent', () => {
  let component: WordFilterComponent;
  let fixture: ComponentFixture<WordFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
