import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuarioSitComponent } from './editar-usuario-sit.component';

describe('EditarUsuarioSitComponent', () => {
  let component: EditarUsuarioSitComponent;
  let fixture: ComponentFixture<EditarUsuarioSitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarUsuarioSitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUsuarioSitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
