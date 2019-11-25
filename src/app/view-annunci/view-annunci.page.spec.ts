import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnnunciPage } from './view-annunci.page';

describe('ViewAnnunciPage', () => {
  let component: ViewAnnunciPage;
  let fixture: ComponentFixture<ViewAnnunciPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAnnunciPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAnnunciPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
