import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { TarjetaElectronica } from 'src/app/modelos/tarjeta-electronica.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { REGISTRO_ELIMINADO } from 'src/app/utilerias/constantes';
import { CatalogoTarjetasElectronicasService } from '../../servicios/catalogo-tarjetas-eletronicas.service';

@Component({
  selector: 'app-catalogo-tarjetas-electronicas-combustible',
  templateUrl: './catalogo-tarjetas-electronicas-combustible.component.html',
  styleUrls: ['./catalogo-tarjetas-electronicas-combustible.component.scss']
})
export class CatalogoTarjetasElectronicasCombustibleComponent implements OnInit {

  inicioPagina: number = 0;
  mostrarModal: boolean = false;
  respuesta!: HttpRespuesta<any> | null;
  tarjetasElectronicas: TarjetaElectronica[] = [];
  tarjetaElectronicaSeleccionada: TarjetaElectronica | null = null;
  numeroConvenio: string = '';

  constructor(
    private route: ActivatedRoute,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService,
    private tarjetaElectronicaService: CatalogoTarjetasElectronicasService
  ) { }

  ngOnInit(): void {
    this.respuesta = this.route.snapshot.data["respuesta"];
    this.tarjetasElectronicas = this.respuesta!.datos.content;
  }

  limpiar(): void {
    this.cargadorService.activar();
    this.numeroConvenio = "";
    this.inicioPagina = 0;
    this.tarjetaElectronicaService.buscarPorFiltros(0, 10, this.numeroConvenio).subscribe(
      (respuesta) => {
        this.tarjetasElectronicas = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.tarjetasElectronicas = this.respuesta!.datos?.content;
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
    this.tarjetaElectronicaService.buscarPorFiltros(0, 10, this.numeroConvenio).subscribe(
      (respuesta) => {
        this.tarjetasElectronicas = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.tarjetasElectronicas = this.respuesta!.datos?.content;
        this.cargadorService.desactivar();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.cargadorService.desactivar();
        this.alertaService.mostrar('error', error.message);
      }
    );
  }

  mostrarModalEliminar(tarjetaElectronica: TarjetaElectronica): void {
    this.tarjetaElectronicaSeleccionada = tarjetaElectronica;
    this.mostrarModal = true;
  }

  eliminar(): void {
    this.cargadorService.activar();
    this.tarjetaElectronicaService.eliminar(this.tarjetaElectronicaSeleccionada?.idTarjetaElectronica).subscribe(
      (respuesa) => {
        let indiceUnidad = this.tarjetasElectronicas.findIndex((t) => t.idTarjetaElectronica === this.tarjetaElectronicaSeleccionada?.idTarjetaElectronica);
        this.tarjetasElectronicas.splice(indiceUnidad, 1);
        this.tarjetaElectronicaSeleccionada = null;
        this.mostrarModal = false;
        this.cargadorService.desactivar();
        this.alertaService.mostrar('exito', REGISTRO_ELIMINADO);
        if (this.tarjetasElectronicas.length === 0) {
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
    this.tarjetaElectronicaService.buscarPorFiltros(pagina, tamanio, '').subscribe(
      (respuesta) => {
        this.tarjetasElectronicas = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.tarjetasElectronicas = this.respuesta!.datos?.content;
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
    if (tamanio !== undefined) {
      this.tarjetaElectronicaService.buscarPorFiltros(pagina, tamanio, '').subscribe(
        (respuesta) => {
          this.tarjetasElectronicas = [];
          this.respuesta = null;
          this.respuesta = respuesta;
          this.tarjetasElectronicas = this.respuesta!.datos?.content;
          this.ordenar(event);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
    }
  }

  ordenar(event: any): void {
    if (event.sortField !== 'idOoad') {
      this.ordenarNumericos(event);
    } else {
      this.ordenarCadenas(event);
    }
  }

  ordenarCadenas(event: any): void {
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
      this.tarjetasElectronicas = this.tarjetasElectronicas.sort((a: any, b: any) => ordenamiento(a, b, event.sortField));
    } else {
      this.tarjetasElectronicas = this.tarjetasElectronicas.sort((a: any, b: any) => ordenamiento(a, b, event.sortField)).reverse();
    }
  }

  ordenarNumericos(event: any): void {
    let ordenamiento = (a: any, b: any, campoOrdenamiento: string) => a[campoOrdenamiento] - b[campoOrdenamiento];
    if (event.sortOrder === 1) {
      this.tarjetasElectronicas = this.tarjetasElectronicas.sort((a: any, b: any) => ordenamiento(a, b, event.sortField));
    } else {
      this.tarjetasElectronicas = this.tarjetasElectronicas.sort((a: any, b: any) => ordenamiento(a, b, event.sortField)).reverse();
    }
  }

}
