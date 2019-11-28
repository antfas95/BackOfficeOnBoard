import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvaTutorialPage } from './prova-tutorial.page';

describe('ProvaTutorialPage', () => {
  let component: ProvaTutorialPage;
  let fixture: ComponentFixture<ProvaTutorialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvaTutorialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvaTutorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
