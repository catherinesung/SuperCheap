import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultfilterComponent } from './resultfilter.component';

describe('ResultfilterComponent', () => {
  let component: ResultfilterComponent;
  let fixture: ComponentFixture<ResultfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
