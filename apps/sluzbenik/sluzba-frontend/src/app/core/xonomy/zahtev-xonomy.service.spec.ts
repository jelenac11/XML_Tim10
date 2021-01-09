import { TestBed } from '@angular/core/testing';

import { ZahtevXonomyService } from './zahtev-xonomy.service';

describe('ZahtevXonomyService', () => {
  let service: ZahtevXonomyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZahtevXonomyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
