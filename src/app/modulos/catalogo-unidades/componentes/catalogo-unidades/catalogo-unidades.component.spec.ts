import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoUnidadesComponent } from './catalogo-unidades.component';

describe('CatalogoUnidadesComponent', () => {
  let component: CatalogoUnidadesComponent;
  let fixture: ComponentFixture<CatalogoUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoUnidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
