import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosPropiosComponent } from './vehiculos-propios.component';

describe('VehiculosPropiosComponent', () => {
  let component: VehiculosPropiosComponent;
  let fixture: ComponentFixture<VehiculosPropiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosPropiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosPropiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
