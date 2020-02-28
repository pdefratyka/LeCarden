import { TestBed } from '@angular/core/testing';

import { WordsResolverService } from './words-resolver.service';

describe('WordsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordsResolverService = TestBed.get(WordsResolverService);
    expect(service).toBeTruthy();
  });
});
