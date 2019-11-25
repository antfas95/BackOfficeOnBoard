import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncontroPage } from './incontro.page';

describe('IncontroPage', () => {
  let component: IncontroPage;
  let fixture: ComponentFixture<IncontroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncontroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncontroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
