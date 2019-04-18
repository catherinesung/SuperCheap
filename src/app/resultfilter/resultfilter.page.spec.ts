import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultfilterPage } from './resultfilter.page';

describe('ResultfilterPage', () => {
  let component: ResultfilterPage;
  let fixture: ComponentFixture<ResultfilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultfilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultfilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
