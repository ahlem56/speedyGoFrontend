import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListComponent } from './event-listBackOffice.component';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventListComponent]
    });
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
