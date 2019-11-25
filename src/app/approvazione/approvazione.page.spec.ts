import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovazionePage } from './approvazione.page';

describe('ApprovazionePage', () => {
  let component: ApprovazionePage;
  let fixture: ComponentFixture<ApprovazionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovazionePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
