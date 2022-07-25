import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { REGISTRO_ELIMINADO } from 'src/app/utilerias/constantes';
import { VehiculoEnajenacionService } from '../../service/vehiculo-enajenacion.service';
import { VehiculoPropioEnajenacionServiceService } from '../../service/vehiculo-propio-enajenacion-service.service';

@Component({
  selector: 'app-catalogo-estatus-enajenacion-vehiculo',
  templateUrl: './catalogo-estatus-enajenacion-vehiculo.component.html',
  styleUrls: ['./catalogo-estatus-enajenacion-vehiculo.component.scss'],
})
export class CatalogoEstatusEnajenacionVehiculoComponent implements OnInit {
  readonly MENSAJE_BORRADO_EXITO = 'El registro ha sido eliminado exitosamente'

  mostrarModal: boolean = false;
  inicioPagina: number = 0;
  respuesta!: HttpRespuesta<any> | null;
  catEstatus: any[] = [];
  estatus: any;

  constructor(
    private route: ActivatedRoute,
    private alertaService: AlertasFlotantesService,
    private estatusEnajenacionService: VehiculoEnajenacionService
  ) { }

  ngOnInit(): void {
    this.respuesta = this.route.snapshot.data['respuesta'];
    this.catEstatus = this.respuesta!.datos?.content;
  }

  mostrarModalEliminar(unidad: any) {
    this.estatus = unidad;
    this.mostrarModal = true;
  }

  eliminar() {
    this.estatusEnajenacionService
      .eliminar(this.estatus.idEstatusEnajenacion)
      .subscribe((response) => {
        this.alertaService.mostrar('exito', REGISTRO_ELIMINADO);
        const index = this.catEstatus.findIndex(
          (u) => u.idEstatusEnajenacion === this.estatus.idEstatusEnajenacion
        );
        this.catEstatus.splice(index, 1);
        //Aplicar esta validacion en todos los metodos de eliminar
        if(this.catEstatus.length === 0) {
          this.recargarTabla();
        }
        this.mostrarModal = false
      }), 
      (error: HttpErrorResponse) => {
        console.error("ERROR: ", error);
      };
  }

  recargarTabla() {
    let pagina = 0;
    let tamanio = 10;
    this.estatusEnajenacionService.buscarPorPagina(pagina, tamanio).subscribe(
      (respuesta) => {
        this.catEstatus = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.catEstatus = this.respuesta!.datos.content;
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
    this.estatusEnajenacionService.buscarPorPagina(pagina, tamanio).subscribe(
      (respuesta) => {
        this.catEstatus = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.catEstatus = this.respuesta!.datos.content;
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
      this.catEstatus = this.catEstatus.sort((a: any, b: any) => ordenamiento(a, b, event.sortField));
    } else {
      this.catEstatus = this.catEstatus.sort((a: any, b: any) => ordenamiento(a, b, event.sortField)).reverse();
    }
  }

}
