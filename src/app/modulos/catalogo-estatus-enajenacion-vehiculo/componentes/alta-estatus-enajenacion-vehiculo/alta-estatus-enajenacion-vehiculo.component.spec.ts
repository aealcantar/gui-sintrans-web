import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEstatusEnajenacionVehiculoComponent } from './alta-estatus-enajenacion-vehiculo.component';

describe('AltaEstatusEnajenacionVehiculoComponent', () => {
  let component: AltaEstatusEnajenacionVehiculoComponent;
  let fixture: ComponentFixture<AltaEstatusEnajenacionVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaEstatusEnajenacionVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEstatusEnajenacionVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
