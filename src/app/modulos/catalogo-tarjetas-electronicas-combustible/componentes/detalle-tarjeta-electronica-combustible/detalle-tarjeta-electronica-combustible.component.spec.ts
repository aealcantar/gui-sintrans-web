import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTarjetaElectronicaCombustibleComponent } from './detalle-tarjeta-electronica-combustible.component';

describe('DetalleTarjetaElectronicaCombustibleComponent', () => {
  let component: DetalleTarjetaElectronicaCombustibleComponent;
  let fixture: ComponentFixture<DetalleTarjetaElectronicaCombustibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTarjetaElectronicaCombustibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTarjetaElectronicaCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
