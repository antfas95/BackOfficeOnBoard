import { TestBed } from '@angular/core/testing';

import { IncontroService } from './incontro.service';

describe('IncontroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncontroService = TestBed.get(IncontroService);
    expect(service).toBeTruthy();
  });
});
