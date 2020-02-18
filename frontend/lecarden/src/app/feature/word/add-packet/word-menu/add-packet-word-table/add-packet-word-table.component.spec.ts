import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPacketWordTableComponent } from './add-packet-word-table.component';

describe('AddPacketWordTableComponent', () => {
  let component: AddPacketWordTableComponent;
  let fixture: ComponentFixture<AddPacketWordTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPacketWordTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPacketWordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
