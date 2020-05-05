import { TestBed } from '@angular/core/testing';

import { SingleWordResolverService } from './single-word-resolver.service';

describe('SingleWordResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingleWordResolverService = TestBed.get(SingleWordResolverService);
    expect(service).toBeTruthy();
  });
});
