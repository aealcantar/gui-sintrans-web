import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { OpcionMenu } from 'src/app/modelos/opcion-menu.interface';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { AutenticacionService } from 'src/app/servicios/seguridad/autenticacion.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  mostrarOverlayUsuario: boolean = false;

  columna1: any[] = [];
  columna2: any[] = [];
  columna3: any[] = [];
  columna4: any[] = [];

  opcionSeleccionada!:OpcionMenu;

  elementos: OpcionMenu[] = [];

  constructor(
    private router: Router,
    public aut: AutenticacionService
  ) { }

  ngOnInit(): void {

  }

  abrirOverlay(event: any, elemento: any) {
    this.opcionSeleccionada = elemento;
    this.columna1 = elemento.columna1;
    this.columna2 = elemento.columna2;
    this.columna3 = elemento.columna3;
    this.columna4 = elemento.columna4;
    this.overlayPanel.toggle(event);
  }

  navegar(ruta: string) {
    this.overlayPanel.hide();
    this.router.navigate([ruta]);
  }

  cerrarSesion(){
    this.aut.cerrarSesion();
    this.router.navigateByUrl('/inicio-sesion');
  }

}
