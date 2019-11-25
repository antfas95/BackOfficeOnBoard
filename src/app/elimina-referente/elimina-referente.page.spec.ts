import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaReferentePage } from './elimina-referente.page';

describe('EliminaReferentePage', () => {
  let component: EliminaReferentePage;
  let fixture: ComponentFixture<EliminaReferentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminaReferentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaReferentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
