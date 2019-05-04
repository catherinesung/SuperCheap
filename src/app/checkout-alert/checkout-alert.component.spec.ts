import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAlertComponent } from './checkout-alert.component';

describe('CheckoutAlertComponent', () => {
  let component: CheckoutAlertComponent;
  let fixture: ComponentFixture<CheckoutAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
