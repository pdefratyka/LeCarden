import { TestBed } from '@angular/core/testing';

import { WordHelperService } from './word-helper.service';

describe('WordHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordHelperService = TestBed.get(WordHelperService);
    expect(service).toBeTruthy();
  });
});
