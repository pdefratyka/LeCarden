import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketSelectorComponent } from './packet-selector.component';

describe('PacketSelectorComponent', () => {
  let component: PacketSelectorComponent;
  let fixture: ComponentFixture<PacketSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
