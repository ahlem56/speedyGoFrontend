import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDetailsBackOfficeComponent } from './subscription-details.component';

describe('SubscriptionDetailsComponent', () => {
  let component: SubscriptionDetailsBackOfficeComponent;
  let fixture: ComponentFixture<SubscriptionDetailsBackOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionDetailsBackOfficeComponent]
    });
    fixture = TestBed.createComponent(SubscriptionDetailsBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
