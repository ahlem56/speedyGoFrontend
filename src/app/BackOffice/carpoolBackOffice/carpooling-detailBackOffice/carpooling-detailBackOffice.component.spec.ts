import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingDetailComponent } from './carpooling-detailBackOffice.component';

describe('CarpoolingDetailComponent', () => {
  let component: CarpoolingDetailComponent;
  let fixture: ComponentFixture<CarpoolingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarpoolingDetailComponent]
    });
    fixture = TestBed.createComponent(CarpoolingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
