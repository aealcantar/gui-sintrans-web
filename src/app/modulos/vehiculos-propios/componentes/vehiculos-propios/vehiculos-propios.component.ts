import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { REGISTRO_ELIMINADO } from 'src/app/utilerias/constantes';
import { CatalogoVehiculosPropiosService } from '../../servicios/catalogo-vehiculos-propios.service';

@Component({
  selector: 'app-vehiculos-propios',
  templateUrl: './vehiculos-propios.component.html',
  styleUrls: ['./vehiculos-propios.component.scss']
})
export class VehiculosPropiosComponent implements OnInit {

  readonly POSICION_VEHICULOS_PROPIOS = 0;
  readonly POSICION_CATALOGO_TIPO_SERVICIO = 1;
  readonly POSICION_CATALOGO_ESTATUS = 2;
  inicioPagina: number = 0;
  respuesta!: any | null;
  mostrarModal: boolean = false;
  vehiculosPropios: any[] = [];
  catTipoServicio: any[] = [];
  catEstatus: any[] = [];
  vehiculoPropio: any;
  ecco: string = "";

  constructor(
    private route: ActivatedRoute,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService,
    private vehiculoPropioService: CatalogoVehiculosPropiosService
  ) { }

  ngOnInit(): void {
    this.respuesta = this.route.snapshot.data["respuesta"];
    this.catTipoServicio = this.respuesta[this.POSICION_CATALOGO_TIPO_SERVICIO].map(
      (tipoServicio: any) => (
        {
          label: tipoServicio.descripcion,
          value: tipoServicio.idTipoServicio
        }
      )
    );
    this.catEstatus = this.respuesta[this.POSICION_CATALOGO_ESTATUS].map(
      (estatus: any) => (
        {
          label: estatus.descripcion,
          value: estatus.idEstatus
        }
      )
    );
    this.vehiculosPropios = this.respuesta[this.POSICION_VEHICULOS_PROPIOS].datos?.content.map(
      (vehiculo: any) => {
        return ({
          ...vehiculo,
          desTipoServicio: this.obtenerNombreTipoServicioPorId(vehiculo.desTipoServicio),
          desEstatusVehiculo: this.obtenerNombreEstatusPorId(vehiculo.desEstatusVehiculo)
        })
      }
    );
  }

  obtenerNombreTipoServicioPorId(idTipoServicio: string) {
    let valor = this.catTipoServicio.find((tp) => tp.value === parseInt(idTipoServicio));
    return valor.label;
  }

  obtenerNombreEstatusPorId(idEstatus: string) {
    let valor = this.catEstatus.find((e) => e.value === parseInt(idEstatus));
    return valor.label;
  }

  limpiar(): void {
    this.cargadorService.activar();
    this.ecco = "";
    this.inicioPagina = 0;
    this.vehiculoPropioService.buscarPorPagina(0, 10).subscribe(
      (respuesta) => {
        this.vehiculosPropios = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.vehiculosPropios = this.respuesta!.datos?.content;
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
    this.vehiculoPropioService.buscarPorFiltroEcco(0, 10, this.ecco).subscribe(
      (respuesta) => {
        this.vehiculosPropios = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.vehiculosPropios = this.respuesta!.datos?.content;
        this.cargadorService.desactivar();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.cargadorService.desactivar();
        this.alertaService.mostrar('error', error.message);
      }
    );
  }

  mostrarModalEliminar(vehiculoPropio: any): void {
    this.vehiculoPropio = vehiculoPropio;
    this.mostrarModal = true;
  }

  eliminar(): void {
    this.cargadorService.activar();
    this.vehiculoPropioService.eliminar(this.vehiculoPropio?.idVehiculo).subscribe(
      (respuesa) => {
        let indiceVehiculo = this.vehiculosPropios.findIndex((v) => v.idVehiculo === this.vehiculoPropio?.idVehiculo);
        this.vehiculosPropios.splice(indiceVehiculo, 1);
        this.vehiculoPropio = null;
        this.mostrarModal = false;
        this.cargadorService.desactivar();
        this.alertaService.mostrar('exito', REGISTRO_ELIMINADO);
        if(this.vehiculosPropios.length === 0) {
          this.recargarTabla();
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

  recargarTabla() {
    let pagina = 0;
    let tamanio = 10;
    this.vehiculoPropioService.buscarPorPagina(pagina, tamanio).subscribe(
      (respuesta) => {
        this.vehiculosPropios = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.vehiculosPropios = this.respuesta.datos?.content.map(
          (vehiculo: any) => {
            return ({
              ...vehiculo,
              desTipoServicio: this.obtenerNombreTipoServicioPorId(vehiculo.desTipoServicio),
              desEstatusVehiculo: this.obtenerNombreEstatusPorId(vehiculo.desEstatusVehiculo)
            })
          }
        );
        this.ordenar(event);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  paginador(event: any): void {
    let inicio = event.first;
    let pagina = Math.floor(inicio / 10);
    let tamanio = event.rows;
    this.vehiculoPropioService.buscarPorPagina(pagina, tamanio).subscribe(
      (respuesta) => {
        this.vehiculosPropios = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.vehiculosPropios = this.respuesta.datos?.content.map(
          (vehiculo: any) => {
            return ({
              ...vehiculo,
              desTipoServicio: this.obtenerNombreTipoServicioPorId(vehiculo.desTipoServicio),
              desEstatusVehiculo: this.obtenerNombreEstatusPorId(vehiculo.desEstatusVehiculo)
            })
          }
        );
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
      this.vehiculosPropios = this.vehiculosPropios.sort((a: any, b: any) => ordenamiento(a, b, event.sortField));
    } else {
      this.vehiculosPropios = this.vehiculosPropios.sort((a: any, b: any) => ordenamiento(a, b, event.sortField)).reverse();
    }
  }

}
