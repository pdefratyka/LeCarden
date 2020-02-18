import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPacketComponent } from './add-packet.component';

describe('AddPacketComponent', () => {
  let component: AddPacketComponent;
  let fixture: ComponentFixture<AddPacketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPacketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
