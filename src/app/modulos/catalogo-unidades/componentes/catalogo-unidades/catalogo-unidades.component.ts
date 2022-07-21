import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { Unidad } from 'src/app/modelos/unidad.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { REGISTRO_ELIMINADO } from 'src/app/utilerias/constantes';
import { CatalogoUnidadesService } from '../../servicios/catalogo-unidades.service';

@Component({
  selector: 'app-catalogo-unidades',
  templateUrl: './catalogo-unidades.component.html',
  styleUrls: ['./catalogo-unidades.component.scss']
})
export class CatalogoUnidadesComponent implements OnInit {

  inicioPagina: number = 0;
  respuesta!: HttpRespuesta<any> | null;
  catUnidades: Unidad[] = [];
  nombreUnidad: string = "";
  ooad: string = "";

  mostrarModal: boolean = false;
  unidadSeleccionada: Unidad | null = null;

  constructor(
    private route: ActivatedRoute,
    private unidadService: CatalogoUnidadesService,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService
  ) { }

  ngOnInit(): void {
    this.respuesta = this.route.snapshot.data["respuesta"];
    this.catUnidades = this.respuesta!.datos.content;
  }

  limpiar(): void {
    this.cargadorService.activar();
    this.nombreUnidad = "";
    this.ooad = "";
    this.inicioPagina = 0;
    this.unidadService.buscarPorPagina(0, 10).subscribe(
      (respuesta) => {
        this.catUnidades = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.catUnidades = this.respuesta!.datos.content;
        this.cargadorService.desactivar();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.cargadorService.desactivar();
        this.alertaService.mostrar('error', error.message);
      }
    );
  }

  buscar(): void {
    this.cargadorService.activar();
    this.unidadService.buscarPorFiltros(0, 10, this.ooad, this.nombreUnidad).subscribe(
      (respuesta) => {
        this.catUnidades = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.catUnidades = this.respuesta!.datos.content;
        this.cargadorService.desactivar();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.cargadorService.desactivar();
        this.alertaService.mostrar('error', error.message);
      }
    );
  }

  mostrarModalEliminar(unidad: Unidad): void {
    this.unidadSeleccionada = unidad;
    this.mostrarModal = true;
  }

  eliminar(): void {
    this.cargadorService.activar();
    this.unidadService.eliminar(this.unidadSeleccionada?.idUnidad).subscribe(
      (respuesa) => {
        if (respuesa.codigo === 200) {
          let indiceUnidad = this.catUnidades.findIndex((u) => u.idUnidad === this.unidadSeleccionada?.idUnidad);
          this.catUnidades.splice(indiceUnidad, 1);
          this.unidadSeleccionada = null;
          this.mostrarModal = false;
          this.cargadorService.desactivar();
          this.alertaService.mostrar('exito', REGISTRO_ELIMINADO);
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.cargadorService.desactivar();
        this.alertaService.mostrar('error', error.message);
        this.mostrarModal = false;
      }
    )
  }

  paginador(event: any): void {
    let inicio = event.first;
    let pagina = Math.floor(inicio / 10);
    let tamanio = event.rows;
    this.unidadService.buscarPorPagina(pagina, tamanio).subscribe(
      (respuesta) => {
        this.catUnidades = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.catUnidades = this.respuesta!.datos.content;
        this.ordenar(event);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  ordenar(event: any): void {
    let ordenamiento = (a: any, b: any, campoOrdenamiento: string) => {
      if (a[campoOrdenamiento] > b[campoOrdenamiento]) {
        return 1;
      }
      if (a[campoOrdenamiento] < b[campoOrdenamiento]) {
        return -1;
      }
      return 0;
    };
    if (event.sortOrder === 1) {
      this.catUnidades = this.catUnidades.sort((a: any, b: any) => ordenamiento(a, b, event.sortField));
    } else {
      this.catUnidades = this.catUnidades.sort((a: any, b: any) => ordenamiento(a, b, event.sortField)).reverse();
    }
  }

}
