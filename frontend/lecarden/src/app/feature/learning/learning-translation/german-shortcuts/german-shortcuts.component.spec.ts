import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GermanShortcutsComponent } from './german-shortcuts.component';

describe('GermanShortcutsComponent', () => {
  let component: GermanShortcutsComponent;
  let fixture: ComponentFixture<GermanShortcutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GermanShortcutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GermanShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
