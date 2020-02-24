import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketFilterComponent } from './packet-filter.component';

describe('PacketFilterComponent', () => {
  let component: PacketFilterComponent;
  let fixture: ComponentFixture<PacketFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
