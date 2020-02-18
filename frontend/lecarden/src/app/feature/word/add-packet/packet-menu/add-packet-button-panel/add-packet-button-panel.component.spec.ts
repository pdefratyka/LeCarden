import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPacketButtonPanelComponent } from './add-packet-button-panel.component';

describe('AddPacketButtonPanelComponent', () => {
  let component: AddPacketButtonPanelComponent;
  let fixture: ComponentFixture<AddPacketButtonPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPacketButtonPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPacketButtonPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
