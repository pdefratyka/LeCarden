import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseToAnswerComponent } from './response-to-answer.component';

describe('ResponseToAnswerComponent', () => {
  let component: ResponseToAnswerComponent;
  let fixture: ComponentFixture<ResponseToAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseToAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseToAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
