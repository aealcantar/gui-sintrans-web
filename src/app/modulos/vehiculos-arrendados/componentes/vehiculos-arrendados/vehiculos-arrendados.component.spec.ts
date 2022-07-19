import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosArrendadosComponent } from './vehiculos-arrendados.component';

describe('VehiculosArrendadosComponent', () => {
  let component: VehiculosArrendadosComponent;
  let fixture: ComponentFixture<VehiculosArrendadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosArrendadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosArrendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
