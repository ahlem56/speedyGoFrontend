import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNotifyComponent } from './event-notify.component';

describe('EventNotifyComponent', () => {
  let component: EventNotifyComponent;
  let fixture: ComponentFixture<EventNotifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventNotifyComponent]
    });
    fixture = TestBed.createComponent(EventNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
