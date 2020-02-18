import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketMenuComponent } from './packet-menu.component';

describe('PacketMenuComponent', () => {
  let component: PacketMenuComponent;
  let fixture: ComponentFixture<PacketMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
