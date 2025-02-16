import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCreationFrontOfficeComponent } from './subscription-creation.component';

describe('SubscriptionCreationComponent', () => {
  let component: SubscriptionCreationFrontOfficeComponent;
  let fixture: ComponentFixture<SubscriptionCreationFrontOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionCreationFrontOfficeComponent]
    });
    fixture = TestBed.createComponent(SubscriptionCreationFrontOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
