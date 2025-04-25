import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionDetailsFrontOfficeComponent } from './promotion-details.component';

describe('PromotionDetailsComponent', () => {
  let component: PromotionDetailsFrontOfficeComponent;
  let fixture: ComponentFixture<PromotionDetailsFrontOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionDetailsFrontOfficeComponent]
    });
    fixture = TestBed.createComponent(PromotionDetailsFrontOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
