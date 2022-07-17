import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTarjetaElectronicaCombustibleComponent } from './editar-tarjeta-electronica-combustible.component';

describe('EditarTarjetaElectronicaCombustibleComponent', () => {
  let component: EditarTarjetaElectronicaCombustibleComponent;
  let fixture: ComponentFixture<EditarTarjetaElectronicaCombustibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTarjetaElectronicaCombustibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTarjetaElectronicaCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
