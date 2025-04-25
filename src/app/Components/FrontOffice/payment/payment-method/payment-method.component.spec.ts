import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodFrontOfficeComponent } from './payment-method.component';

describe('PaymentMethodComponent', () => {
  let component: PaymentMethodFrontOfficeComponent;
  let fixture: ComponentFixture<PaymentMethodFrontOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodFrontOfficeComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodFrontOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
