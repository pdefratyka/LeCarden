import { TestBed } from '@angular/core/testing';

import { SinglePacketResolverService } from './single-packet-resolver.service';

describe('SinglePacketResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SinglePacketResolverService = TestBed.get(SinglePacketResolverService);
    expect(service).toBeTruthy();
  });
});
