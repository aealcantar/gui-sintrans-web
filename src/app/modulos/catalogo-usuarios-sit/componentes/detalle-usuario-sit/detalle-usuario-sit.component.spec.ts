import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUsuarioSitComponent } from './detalle-usuario-sit.component';

describe('DetalleUsuarioSitComponent', () => {
  let component: DetalleUsuarioSitComponent;
  let fixture: ComponentFixture<DetalleUsuarioSitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleUsuarioSitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleUsuarioSitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
