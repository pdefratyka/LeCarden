import { TestBed } from '@angular/core/testing';

import { CategoriesResolverService } from './categories-resolver.service';

describe('CategoriesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesResolverService = TestBed.get(CategoriesResolverService);
    expect(service).toBeTruthy();
  });
});
