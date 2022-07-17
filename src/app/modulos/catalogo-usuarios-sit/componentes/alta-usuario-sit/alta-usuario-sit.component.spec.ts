import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaUsuarioSitComponent } from './alta-usuario-sit.component';

describe('AltaUsuarioSitComponent', () => {
  let component: AltaUsuarioSitComponent;
  let fixture: ComponentFixture<AltaUsuarioSitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaUsuarioSitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaUsuarioSitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
