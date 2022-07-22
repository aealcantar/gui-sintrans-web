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
  styleUrls: ['./catalogo-estatus-enajenacion-vehiculo.component.scss']
})
export class CatalogoEstatusEnajenacionVehiculoComponent implements OnInit {

  mostrarModal: boolean = false;
respuseta!: HttpRespuesta<any>| null;
  unidades: any[] = [];
  unidad:any

  constructor(
    private route: ActivatedRoute,
    private alertaService: AlertasFlotantesService,
    private servicioVehiculosPropios : VehiculoPropioEnajenacionServiceService,
    private servicioVehiculosEnajenacion: VehiculoEnajenacionService) { }

  ngOnInit(): void {
    this.respuseta = this.route.snapshot.data["respuesta"]
    this.unidades = this.respuseta!.data

  }

  mostrarModalEliminar(unidad:any){
    this.unidad = unidad
    this.mostrarModal = true 
  }
eliminar(){
  this.servicioVehiculosPropios.eliminar(this.unidad).subscribe(response=>{
    if(response.codigo ===200){

    }
  })

}
}
