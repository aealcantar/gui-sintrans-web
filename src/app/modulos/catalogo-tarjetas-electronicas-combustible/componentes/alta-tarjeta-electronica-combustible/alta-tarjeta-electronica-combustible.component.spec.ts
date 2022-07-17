import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTarjetaElectronicaCombustibleComponent } from './alta-tarjeta-electronica-combustible.component';

describe('AltaTarjetaElectronicaCombustibleComponent', () => {
  let component: AltaTarjetaElectronicaCombustibleComponent;
  let fixture: ComponentFixture<AltaTarjetaElectronicaCombustibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaTarjetaElectronicaCombustibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaTarjetaElectronicaCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
