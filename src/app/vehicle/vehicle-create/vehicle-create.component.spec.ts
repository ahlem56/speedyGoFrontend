import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCreateComponent } from './vehicle-create.component';

describe('VehicleCreateComponent', () => {
  let component: VehicleCreateComponent;
  let fixture: ComponentFixture<VehicleCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleCreateComponent]
    });
    fixture = TestBed.createComponent(VehicleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
