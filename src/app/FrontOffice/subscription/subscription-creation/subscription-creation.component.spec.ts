import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCreationComponent } from './subscription-creation.component';

describe('SubscriptionCreationComponent', () => {
  let component: SubscriptionCreationComponent;
  let fixture: ComponentFixture<SubscriptionCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionCreationComponent]
    });
    fixture = TestBed.createComponent(SubscriptionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
