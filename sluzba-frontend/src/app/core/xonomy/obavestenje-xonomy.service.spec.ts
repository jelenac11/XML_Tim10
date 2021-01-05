import { TestBed } from '@angular/core/testing';

import { ObavestenjeXonomyService } from './obavestenje-xonomy.service';

describe('ObavestenjeXonomyService', () => {
  let service: ObavestenjeXonomyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObavestenjeXonomyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
