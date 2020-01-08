import { TestBed } from '@angular/core/testing';

import { IndirizziService } from './indirizzi.service';

describe('IndirizziService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndirizziService = TestBed.get(IndirizziService);
    expect(service).toBeTruthy();
  });
});
