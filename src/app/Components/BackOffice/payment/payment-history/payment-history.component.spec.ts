import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryBackOfficeComponent } from './payment-history.component';

describe('PaymentHistoryComponent', () => {
  let component: PaymentHistoryBackOfficeComponent;
  let fixture: ComponentFixture<PaymentHistoryBackOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentHistoryBackOfficeComponent]
    });
    fixture = TestBed.createComponent(PaymentHistoryBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
