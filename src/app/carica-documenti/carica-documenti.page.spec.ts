import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaricaDocumentiPage } from './carica-documenti.page';

describe('CaricaDocumentiPage', () => {
  let component: CaricaDocumentiPage;
  let fixture: ComponentFixture<CaricaDocumentiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaricaDocumentiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaricaDocumentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
