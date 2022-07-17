import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTarjetasElectronicasCombustibleComponent } from './catalogo-tarjetas-electronicas-combustible.component';

describe('CatalogoTarjetasElectronicasCombustibleComponent', () => {
  let component: CatalogoTarjetasElectronicasCombustibleComponent;
  let fixture: ComponentFixture<CatalogoTarjetasElectronicasCombustibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoTarjetasElectronicasCombustibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoTarjetasElectronicasCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
