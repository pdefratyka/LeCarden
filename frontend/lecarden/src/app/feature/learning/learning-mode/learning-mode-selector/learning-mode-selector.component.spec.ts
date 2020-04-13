import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningModeSelectorComponent } from './learning-mode-selector.component';

describe('LearningModeSelectorComponent', () => {
  let component: LearningModeSelectorComponent;
  let fixture: ComponentFixture<LearningModeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningModeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningModeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
