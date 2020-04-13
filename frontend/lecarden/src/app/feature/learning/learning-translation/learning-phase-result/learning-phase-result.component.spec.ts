import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPhaseResultComponent } from './learning-phase-result.component';

describe('LearningPhaseResultComponent', () => {
  let component: LearningPhaseResultComponent;
  let fixture: ComponentFixture<LearningPhaseResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningPhaseResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningPhaseResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
