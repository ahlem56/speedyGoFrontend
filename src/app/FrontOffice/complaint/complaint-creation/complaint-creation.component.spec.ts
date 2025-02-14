import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintCreationComponent } from './complaint-creation.component';

describe('ComplaintCreationComponent', () => {
  let component: ComplaintCreationComponent;
  let fixture: ComponentFixture<ComplaintCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintCreationComponent]
    });
    fixture = TestBed.createComponent(ComplaintCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
