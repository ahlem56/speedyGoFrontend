import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelDetailComponent } from './parcel-detailBackOffice.component';

describe('ParcelDetailComponent', () => {
  let component: ParcelDetailComponent;
  let fixture: ComponentFixture<ParcelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcelDetailComponent]
    });
    fixture = TestBed.createComponent(ParcelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
