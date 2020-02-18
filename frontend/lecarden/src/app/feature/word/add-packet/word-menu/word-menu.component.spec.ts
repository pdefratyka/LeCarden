import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordMenuComponent } from './word-menu.component';

describe('WordMenuComponent', () => {
  let component: WordMenuComponent;
  let fixture: ComponentFixture<WordMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
