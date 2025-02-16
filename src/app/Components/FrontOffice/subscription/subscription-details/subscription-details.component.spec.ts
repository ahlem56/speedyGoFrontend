import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDetailsFrontOfficeComponent } from './subscription-details.component';

describe('SubscriptionDetailsComponent', () => {
  let component: SubscriptionDetailsFrontOfficeComponent;
  let fixture: ComponentFixture<SubscriptionDetailsFrontOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionDetailsFrontOfficeComponent]
    });
    fixture = TestBed.createComponent(SubscriptionDetailsFrontOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
