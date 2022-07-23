import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { VehiculoEnajenacionService } from '../../service/vehiculo-enajenacion.service';
import { VehiculoPropioEnajenacionServiceService } from '../../service/vehiculo-propio-enajenacion-service.service';

@Component({
  selector: 'app-catalogo-estatus-enajenacion-vehiculo',
  templateUrl: './catalogo-estatus-enajenacion-vehiculo.component.html',
  styleUrls: ['./catalogo-estatus-enajenacion-vehiculo.component.scss'],
})
export class CatalogoEstatusEnajenacionVehiculoComponent implements OnInit {
  mostrarModal: boolean = false;
  inicioPagina:number = 0
  respuesta!: HttpRespuesta<any> | null;
  estatusList: any[] = [];
  estatus: any;
  constructor(
    private route: ActivatedRoute,
    private alertaService: AlertasFlotantesService,
    private estatusEnajenacionService: VehiculoEnajenacionService
  ) {}

  ngOnInit(): void {
    this.respuesta = this.route.snapshot.data['respuesta'];
    console.log(this.respuesta);
    this.estatusList = this.respuesta!.datos.content;
  }

  mostrarModalEliminar(unidad: any) {
    this.estatus = unidad;
    this.mostrarModal = true;
  }
  eliminar() {
    this.estatusEnajenacionService
      .eliminar(this.estatus.idEstatusEnajenacion)
      .subscribe((response) => {
        if (response.codigo === 200) {
          this.alertaService.mostrar('exito', 'Se Elimino El Registro');
          const index = this.estatusList.findIndex(
            (u) => u.idEstatusEnajenacion === this.estatus.idEstatusEnajenacion
          );
          this.estatusList.splice(index, 1);
          this.mostrarModal = false 
          this.alertaService.limpiar();
        }
      });
  }
  paginador(event: any): void {
    let inicio = event.first;
    let pagina = Math.floor(inicio / 10);
    let tamanio = event.rows;
    this.estatusEnajenacionService.buscarPorPagina(pagina, tamanio).subscribe(
      (respuesta) => {
        this.estatusList = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.estatusList = this.respuesta!.datos.content;
        //this.ordenar(event);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

}
