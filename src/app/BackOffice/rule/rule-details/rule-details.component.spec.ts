import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDetailsComponent } from './rule-details.component';

describe('RuleDetailsComponent', () => {
  let component: RuleDetailsComponent;
  let fixture: ComponentFixture<RuleDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleDetailsComponent]
    });
    fixture = TestBed.createComponent(RuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
