import { TestBed } from '@angular/core/testing';

import { LanguageHelperService } from './language-helper.service';

describe('LanguageHelperService', () => {
  let service: LanguageHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
