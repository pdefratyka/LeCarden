import { TestBed } from '@angular/core/testing';

import { FilteredPacketResolverService } from './filtered-packet-resolver.service';

describe('FilteredPacketResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilteredPacketResolverService = TestBed.get(FilteredPacketResolverService);
    expect(service).toBeTruthy();
  });
});
