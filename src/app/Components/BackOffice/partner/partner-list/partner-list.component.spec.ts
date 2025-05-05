import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerListBackOfficeComponent } from './partner-list.component';

describe('PartnerListComponent', () => {
  let component: PartnerListBackOfficeComponent;
  let fixture: ComponentFixture<PartnerListBackOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerListBackOfficeComponent]
    });
    fixture = TestBed.createComponent(PartnerListBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
