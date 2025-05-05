import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCreationFrontOfficeComponent } from './payment-creation.component';

describe('PaymentCreationComponent', () => {
  let component: PaymentCreationFrontOfficeComponent;
  let fixture: ComponentFixture<PaymentCreationFrontOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentCreationFrontOfficeComponent]
    });
    fixture = TestBed.createComponent(PaymentCreationFrontOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
