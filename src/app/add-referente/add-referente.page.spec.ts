import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferentePage } from './add-referente.page';

describe('AddReferentePage', () => {
  let component: AddReferentePage;
  let fixture: ComponentFixture<AddReferentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReferentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReferentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
