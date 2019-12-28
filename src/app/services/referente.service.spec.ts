import { TestBed } from '@angular/core/testing';

import { ReferenteService } from './referente.service';

describe('ReferenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReferenteService = TestBed.get(ReferenteService);
    expect(service).toBeTruthy();
  });
});
