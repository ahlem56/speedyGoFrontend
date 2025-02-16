import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerEditBackOfficeComponent } from './partner-edit.component';

describe('PartnerEditComponent', () => {
  let component: PartnerEditBackOfficeComponent;
  let fixture: ComponentFixture<PartnerEditBackOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerEditBackOfficeComponent]
    });
    fixture = TestBed.createComponent(PartnerEditBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
