import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingListComponent } from './carpooling-listBackOffice.component';

describe('CarpoolingListComponent', () => {
  let component: CarpoolingListComponent;
  let fixture: ComponentFixture<CarpoolingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarpoolingListComponent]
    });
    fixture = TestBed.createComponent(CarpoolingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
