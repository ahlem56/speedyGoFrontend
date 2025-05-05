import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionEditBackOfficeComponent } from './promotion-edit.component';

describe('PromotionEditComponent', () => {
  let component: PromotionEditBackOfficeComponent;
  let fixture: ComponentFixture<PromotionEditBackOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionEditBackOfficeComponent]
    });
    fixture = TestBed.createComponent(PromotionEditBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
