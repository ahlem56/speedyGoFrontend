import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionCreationBackOfficeComponent } from './promotion-creation.component';

describe('PromotionCreationComponent', () => {
  let component: PromotionCreationBackOfficeComponent;
  let fixture: ComponentFixture<PromotionCreationBackOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionCreationBackOfficeComponent]
    });
    fixture = TestBed.createComponent(PromotionCreationBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
