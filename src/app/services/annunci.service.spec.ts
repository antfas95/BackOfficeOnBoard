import { TestBed } from '@angular/core/testing';

import { AnnunciService } from './annunci.service';

describe('AnnunciService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnunciService = TestBed.get(AnnunciService);
    expect(service).toBeTruthy();
  });
});
