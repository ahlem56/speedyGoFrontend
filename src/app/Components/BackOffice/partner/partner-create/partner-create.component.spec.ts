import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCreateBackOfficeComponent } from './partner-create.component';

describe('PartnerCreateComponent', () => {
  let component: PartnerCreateBackOfficeComponent;
  let fixture: ComponentFixture<PartnerCreateBackOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerCreateBackOfficeComponent]
    });
    fixture = TestBed.createComponent(PartnerCreateBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
