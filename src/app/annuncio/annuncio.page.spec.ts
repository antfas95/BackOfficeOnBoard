import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuncioPage } from './annuncio.page';

describe('AnnuncioPage', () => {
  let component: AnnuncioPage;
  let fixture: ComponentFixture<AnnuncioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnuncioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnuncioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
