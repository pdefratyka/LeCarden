import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPacketWordFilterComponent } from './add-packet-word-filter.component';

describe('AddPacketWordFilterComponent', () => {
  let component: AddPacketWordFilterComponent;
  let fixture: ComponentFixture<AddPacketWordFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPacketWordFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPacketWordFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
