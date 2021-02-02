import { TestBed } from '@angular/core/testing';

import { ResenjaXonomyService } from './resenja-xonomy.service';

describe('ResenjaXonomyService', () => {
  let service: ResenjaXonomyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResenjaXonomyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
