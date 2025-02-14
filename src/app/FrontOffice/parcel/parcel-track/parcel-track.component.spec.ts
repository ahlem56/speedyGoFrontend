import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelTrackComponent } from './parcel-track.component';

describe('ParcelTrackComponent', () => {
  let component: ParcelTrackComponent;
  let fixture: ComponentFixture<ParcelTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcelTrackComponent]
    });
    fixture = TestBed.createComponent(ParcelTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
