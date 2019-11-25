import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminazionePage } from './eliminazione.page';

describe('EliminazionePage', () => {
  let component: EliminazionePage;
  let fixture: ComponentFixture<EliminazionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminazionePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
