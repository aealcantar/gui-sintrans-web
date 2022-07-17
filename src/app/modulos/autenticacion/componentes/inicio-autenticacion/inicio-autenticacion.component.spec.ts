import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAutenticacionComponent } from './inicio-autenticacion.component';

describe('InicioAutenticacionComponent', () => {
  let component: InicioAutenticacionComponent;
  let fixture: ComponentFixture<InicioAutenticacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioAutenticacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioAutenticacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
