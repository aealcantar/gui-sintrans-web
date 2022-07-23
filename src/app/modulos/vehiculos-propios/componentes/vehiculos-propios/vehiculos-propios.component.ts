import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';

@Component({
  selector: 'app-vehiculos-propios',
  templateUrl: './vehiculos-propios.component.html',
  styleUrls: ['./vehiculos-propios.component.scss']
})
export class VehiculosPropiosComponent implements OnInit {

  readonly POSICION_VEHICULOS_PROPIOS = 0;
  mostrarModal: boolean = false;
  respuesta!: HttpRespuesta<any> | null;
  vehiculosPropios: any[] = [];

  constructor(
    private route: ActivatedRoute,
    // private router: Router,
    // private formBuilder: FormBuilder,
    // private alertaService: AlertasFlotantesService,
    // private cargadorService: CargadorService,
    // private vehiculoPropioService: CatalogoVehiculosPropiosService
  ) { }

  ngOnInit(): void {
    let respuesta = this.route.snapshot.data["respuesta"];
    this.vehiculosPropios = respuesta[this.POSICION_VEHICULOS_PROPIOS].datos;
    console.log(this.vehiculosPropios);
  }

}
