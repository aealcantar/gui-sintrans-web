import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoEstatusEnajenacionVehiculoComponent } from './catalogo-estatus-enajenacion-vehiculo.component';

describe('CatalogoEstatusEnajenacionVehiculoComponent', () => {
  let component: CatalogoEstatusEnajenacionVehiculoComponent;
  let fixture: ComponentFixture<CatalogoEstatusEnajenacionVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoEstatusEnajenacionVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoEstatusEnajenacionVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
