import { TestBed } from '@angular/core/testing';

import { ZalbaCutanjeXonomyService } from './zalba-cutanje-xonomy.service';

describe('ZalbaCutanjeXonomyService', () => {
  let service: ZalbaCutanjeXonomyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZalbaCutanjeXonomyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
