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
  respuseta!: HttpRespuesta<any> | null;
  unidades: any[] = [];
  unidad: any;

  constructor(
    private route: ActivatedRoute,
    private alertaService: AlertasFlotantesService,
    private estatusEnajenacionService: VehiculoEnajenacionService
  ) {}

  ngOnInit(): void {
    this.respuseta = this.route.snapshot.data['respuesta'];
    console.log(this.respuseta);
    this.unidades = this.respuseta!.datos.content;
  }

  mostrarModalEliminar(unidad: any) {
    this.unidad = unidad;
    this.mostrarModal = true;
  }
  eliminar() {
    this.estatusEnajenacionService
      .eliminar(this.unidad.idEstatusEnajenacion)
      .subscribe((response) => {
        if (response.codigo === 200) {
          this.alertaService.mostrar('exito', 'Se Elimino El Registro');
          const index = this.unidades.findIndex(
            (u) => u.idEstatusEnajenacion === this.unidad.idEstatusEnajenacion
          );
          this.unidades.splice(index, 1);
          this.mostrarModal = false 
          this.alertaService.limpiar();
        }
      });
  }
}
