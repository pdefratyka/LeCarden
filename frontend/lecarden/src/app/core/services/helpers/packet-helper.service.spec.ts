import { TestBed } from '@angular/core/testing';

import { PacketHelperService } from './packet-helper.service';

describe('PacketHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PacketHelperService = TestBed.get(PacketHelperService);
    expect(service).toBeTruthy();
  });
});
