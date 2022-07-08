import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderImssPublicoComponent } from './header-imss-publico.component';

describe('HeaderImssPublicoComponent', () => {
  let component: HeaderImssPublicoComponent;
  let fixture: ComponentFixture<HeaderImssPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderImssPublicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderImssPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
