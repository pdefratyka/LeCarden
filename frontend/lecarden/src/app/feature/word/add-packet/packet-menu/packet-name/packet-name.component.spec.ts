import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketNameComponent } from './packet-name.component';

describe('PacketNameComponent', () => {
  let component: PacketNameComponent;
  let fixture: ComponentFixture<PacketNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
