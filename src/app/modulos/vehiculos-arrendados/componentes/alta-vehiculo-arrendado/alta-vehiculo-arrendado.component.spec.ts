import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaVehiculoArrendadoComponent } from './alta-vehiculo-arrendado.component';

describe('AltaVehiculoArrendadoComponent', () => {
  let component: AltaVehiculoArrendadoComponent;
  let fixture: ComponentFixture<AltaVehiculoArrendadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaVehiculoArrendadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaVehiculoArrendadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
