import { TestBed } from '@angular/core/testing';

import { ZalbaNaOdlukuXonomyService } from './zalba-na-odluku-xonomy.service';

describe('ZalbaNaOdlukuXonomyService', () => {
  let service: ZalbaNaOdlukuXonomyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZalbaNaOdlukuXonomyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
