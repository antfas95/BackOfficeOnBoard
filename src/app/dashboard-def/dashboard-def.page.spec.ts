import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDefPage } from './dashboard-def.page';

describe('DashboardDefPage', () => {
  let component: DashboardDefPage;
  let fixture: ComponentFixture<DashboardDefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDefPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
