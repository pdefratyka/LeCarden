import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPacketComponent } from './display-packet.component';

describe('DisplayPacketComponent', () => {
  let component: DisplayPacketComponent;
  let fixture: ComponentFixture<DisplayPacketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPacketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
