import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { REGISTRO_ELIMINADO } from 'src/app/utilerias/constantes';
import { VehiculosArrendadosService } from '../../servicios/vehiculos-arrendados.service';

@Component({
  selector: 'app-vehiculos-arrendados',
  templateUrl: './vehiculos-arrendados.component.html',
  styleUrls: ['./vehiculos-arrendados.component.scss']
})
export class VehiculosArrendadosComponent implements OnInit {

  readonly POSICION_VEHICULOS_ARRENDADOS = 0;
  readonly POSICION_CATALOGO_TIPO_SERVICIO = 1;
  readonly POSICION_CATALOGO_ESTATUS = 2;
  inicioPagina: number = 0;
  respuesta!: any | null;
  mostrarModal: boolean = false;
  vehiculosArrendados!: any[];
  catTipoServicio: any[] = [];
  catEstatus: any[] = [];
  vehiculoArrendado: any;
  ecco: string = "";

  constructor(
    private route: ActivatedRoute,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService,
    private vehiculoArrendadosService: VehiculosArrendadosService
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
    this.vehiculosArrendados = this.respuesta[this.POSICION_VEHICULOS_ARRENDADOS].datos?.content.map(
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
    console.log("VALOR: ", valor);
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
    this.vehiculoArrendadosService.buscarPorPagina(0, 10).subscribe(
      (respuesta) => {
        this.vehiculosArrendados = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.vehiculosArrendados = this.respuesta!.datos?.content;
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
    this.vehiculoArrendadosService.buscarPorFiltroEcco(0, 10, this.ecco).subscribe(
      (respuesta) => {
        this.vehiculosArrendados = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.vehiculosArrendados = this.respuesta!.datos?.content;
        this.cargadorService.desactivar();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.cargadorService.desactivar();
        this.alertaService.mostrar('error', error.message);
      }
    );
  }

  mostrarModalEliminar(vehiculoArrendado: any): void {
    this.vehiculoArrendado = vehiculoArrendado;
    this.mostrarModal = true;
  }

  eliminar(): void {
    this.cargadorService.activar();
    this.vehiculoArrendadosService.eliminar(this.vehiculoArrendado?.idVehiculo).subscribe(
      (respuesa) => {
        let indiceVehiculo = this.vehiculosArrendados.findIndex((v) => v.idVehiculo === this.vehiculoArrendado?.idVehiculo);
        this.vehiculosArrendados.splice(indiceVehiculo, 1);
        this.vehiculoArrendado = null;
        this.mostrarModal = false;
        this.cargadorService.desactivar();
        this.alertaService.mostrar('exito', REGISTRO_ELIMINADO);
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
    this.vehiculoArrendadosService.buscarPorPagina(pagina, tamanio).subscribe(
      (respuesta) => {
        this.vehiculosArrendados = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.vehiculosArrendados = this.respuesta.datos?.content.map(
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
      this.vehiculosArrendados = this.vehiculosArrendados.sort((a: any, b: any) => ordenamiento(a, b, event.sortField));
    } else {
      this.vehiculosArrendados = this.vehiculosArrendados.sort((a: any, b: any) => ordenamiento(a, b, event.sortField)).reverse();
    }
  }

}
