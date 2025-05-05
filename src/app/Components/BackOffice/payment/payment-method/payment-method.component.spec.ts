import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodBackOfficeComponent } from './payment-method.component';

describe('PaymentMethodComponent', () => {
  let component: PaymentMethodBackOfficeComponent;
  let fixture: ComponentFixture<PaymentMethodBackOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodBackOfficeComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
