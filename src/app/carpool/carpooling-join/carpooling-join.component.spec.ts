import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingJoinComponent } from './carpooling-join.component';

describe('CarpoolingJoinComponent', () => {
  let component: CarpoolingJoinComponent;
  let fixture: ComponentFixture<CarpoolingJoinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarpoolingJoinComponent]
    });
    fixture = TestBed.createComponent(CarpoolingJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
