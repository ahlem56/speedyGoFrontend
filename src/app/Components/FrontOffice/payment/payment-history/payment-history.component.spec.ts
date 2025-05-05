import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryFrontOfficeComponent } from './payment-history.component';

describe('PaymentHistoryComponent', () => {
  let component: PaymentHistoryFrontOfficeComponent;
  let fixture: ComponentFixture<PaymentHistoryFrontOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentHistoryFrontOfficeComponent]
    });
    fixture = TestBed.createComponent(PaymentHistoryFrontOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
