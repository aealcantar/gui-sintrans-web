import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstatusEnajenacionVehiculoComponent } from './editar-estatus-enajenacion-vehiculo.component';

describe('EditarEstatusEnajenacionVehiculoComponent', () => {
  let component: EditarEstatusEnajenacionVehiculoComponent;
  let fixture: ComponentFixture<EditarEstatusEnajenacionVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEstatusEnajenacionVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstatusEnajenacionVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
