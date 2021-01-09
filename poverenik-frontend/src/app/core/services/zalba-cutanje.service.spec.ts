import { TestBed } from '@angular/core/testing';

import { ZalbaCutanjeService } from './zalba-cutanje.service';

describe('ZalbaCutanjeService', () => {
  let service: ZalbaCutanjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZalbaCutanjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
