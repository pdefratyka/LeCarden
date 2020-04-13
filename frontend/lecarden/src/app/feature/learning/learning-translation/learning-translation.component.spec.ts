import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningTranslationComponent } from './learning-translation.component';

describe('LearningTranslationComponent', () => {
  let component: LearningTranslationComponent;
  let fixture: ComponentFixture<LearningTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
