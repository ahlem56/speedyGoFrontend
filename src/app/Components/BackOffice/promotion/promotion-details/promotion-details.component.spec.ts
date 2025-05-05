import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionDetailsBackOfficeComponent } from './promotion-details.component';

describe('PromotionDetailsComponent', () => {
  let component: PromotionDetailsBackOfficeComponent;
  let fixture: ComponentFixture<PromotionDetailsBackOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionDetailsBackOfficeComponent]
    });
    fixture = TestBed.createComponent(PromotionDetailsBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
