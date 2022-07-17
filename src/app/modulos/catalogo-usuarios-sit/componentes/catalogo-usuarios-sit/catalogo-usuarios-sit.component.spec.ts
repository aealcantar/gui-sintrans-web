import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoUsuariosSitComponent } from './catalogo-usuarios-sit.component';



describe('CatalogoUsuariosSitComponent', () => {
  let component: CatalogoUsuariosSitComponent;
  let fixture: ComponentFixture<CatalogoUsuariosSitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoUsuariosSitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoUsuariosSitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
