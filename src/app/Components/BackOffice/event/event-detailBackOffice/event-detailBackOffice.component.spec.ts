import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailComponent } from './event-detailBackOffice.component';

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDetailComponent]
    });
    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
