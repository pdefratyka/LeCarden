import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningFinalPageComponent } from './learning-final-page.component';

describe('LearningFinalPageComponent', () => {
  let component: LearningFinalPageComponent;
  let fixture: ComponentFixture<LearningFinalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningFinalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningFinalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
