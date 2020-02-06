import { TestBed } from '@angular/core/testing';

import { SelectuserService } from './selectuser.service';

describe('SelectuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectuserService = TestBed.get(SelectuserService);
    expect(service).toBeTruthy();
  });
});
