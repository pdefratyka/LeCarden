import { TestBed } from '@angular/core/testing';

import { PacketsResolverService } from './packets-resolver.service';

describe('PacketsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PacketsResolverService = TestBed.get(PacketsResolverService);
    expect(service).toBeTruthy();
  });
});
