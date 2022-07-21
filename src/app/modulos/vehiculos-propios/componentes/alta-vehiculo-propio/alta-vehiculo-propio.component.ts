import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { Unidad } from 'src/app/modelos/unidad.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { CatalogoVehiculosPropiosService } from '../../servicios/catalogo-vehiculos-propios.service';

@Component({
  selector: 'app-alta-vehiculo-propio',
  templateUrl: './alta-vehiculo-propio.component.html',
  styleUrls: ['./alta-vehiculo-propio.component.scss'],
  providers: [DatePipe]
})
export class AltaVehiculoPropioComponent implements OnInit {

  //Se debe crear un atributo de archivos por cada componente cargador-archivo que exista
  archivos: any[] = [];

  readonly POSICION_CATALOGO_UNIDADES = 0;
  readonly POSICION_CATALOGO_TIPO_VEHICULO = 1;
  readonly POSICION_CATALOGO_CONUEE = 2;
  readonly POSICION_CATALOGO_TIPO_SERVICIO = 3;
  readonly POSICION_CATALOGO_VERSION = 4;
  readonly POSICION_CATALOGO_TIPO_REGIMEN = 5;
  readonly POSICION_CATALOGO_COMBUSTIBLE = 6;
  readonly POSICION_CATALOGO_TONELADAS = 7;
  readonly POSICION_CATALOGO_CILINDROS = 8;
  readonly POSICION_CATALOGO_ESTATUS = 9;
  readonly ALTA_VEHICULO_PROPIO = "La vehículo propio ha sido dada de alta exitosamente.";
  respuesta!: HttpRespuesta<any> | null;
  catUnidades: Unidad[] = [];
  catTipoVehiculo: any[] = [];
  catCONUEE: any[] = [];
  catTipoServicio: any[] = [];
  catVersion: any[] = [];
  catTipoRegimen: any[] = [];
  catCombustible: any[] = [];
  catToneladas: any[] = [];
  catCilindros: any[] = [];
  catEstatus: any[] = [];
  catTipoServicioCONUEE: any[] = [];

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService,
    private vehiculoPropioService: CatalogoVehiculosPropiosService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    let respuesta = this.route.snapshot.data["respuesta"];
    this.catUnidades = respuesta[this.POSICION_CATALOGO_UNIDADES].datos.map(
      (unidad: any) => ({
        label: unidad.nomUnidadAdscripcion,
        value: unidad.idUnidad
      })
    );
    this.catTipoVehiculo = respuesta[this.POSICION_CATALOGO_TIPO_VEHICULO].map(
      (tipoVehiculo: any) => (
        {
          label: tipoVehiculo.descripcion,
          value: tipoVehiculo.idTipoVehiculo
        }
      )
    );
    this.catCONUEE = respuesta[this.POSICION_CATALOGO_CONUEE].map(
      (conuee: any) => (
        {
          label: conuee.descripcion,
          value: conuee.idClasificacionCONUEE
        }
      )
    );
    this.catTipoServicioCONUEE = respuesta[this.POSICION_CATALOGO_TIPO_SERVICIO];
    this.catTipoServicio = respuesta[this.POSICION_CATALOGO_TIPO_SERVICIO].map(
      (tipoServicio: any) => (
        {
          label: tipoServicio.descripcion,
          value: tipoServicio.idTipoServicio
        }
      )
    );
    this.catVersion = respuesta[this.POSICION_CATALOGO_VERSION].map(
      (version: any) => (
        {
          label: version.descripcion,
          value: version.idVersion
        }
      )
    );
    this.catTipoRegimen = respuesta[this.POSICION_CATALOGO_TIPO_REGIMEN].map(
      (regimen: any) => (
        {
          label: regimen.descripcion,
          value: regimen.idTipoRegimen
        }
      )
    );
    this.catCombustible = respuesta[this.POSICION_CATALOGO_COMBUSTIBLE].map(
      (combustible: any) => (
        {
          label: combustible.descripcion,
          value: combustible.idCombustible
        }
      )
    );
    this.catToneladas = respuesta[this.POSICION_CATALOGO_TONELADAS].map(
      (tonelada: any) => (
        {
          label: tonelada.descripcion,
          value: tonelada.idTonelada
        }
      )
    );
    this.catCilindros = respuesta[this.POSICION_CATALOGO_CILINDROS].map(
      (cilindro: any) => (
        {
          label: cilindro.descripcion,
          value: cilindro.idCilindro
        }
      )
    );
    this.catEstatus = respuesta[this.POSICION_CATALOGO_ESTATUS].map(
      (estatus: any) => (
        {
          label: estatus.descripcion,
          value: estatus.idEstatus
        }
      )
    );
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      numeroConvenio: new FormControl('', Validators.required),
      nombreEmpresa: new FormControl('', Validators.required),
      importeMensual: new FormControl('', Validators.required),
      fechaInicioConvenio: new FormControl(null, Validators.required),
      fechaFinConvenio: new FormControl(null, Validators.required),
      litrosLimite: new FormControl('', Validators.required),
      ooad: new FormControl('', Validators.required),
      folioInicial: new FormControl('', Validators.required),
      folioFinal: new FormControl('', Validators.required),
      km: new FormControl('', Validators.required),
      estatus: new FormControl('', Validators.required)
    });
  }

  validarArchivo(event: any) {
    console.log(event);
  }

  guardar(): void {
    console.log(this.archivos);
    this.cargadorService.activar();
    let tarjetaElectronica: any = {
      numeroConvenio: this.form.get("numeroConvenio")?.value,
      nombreEmpresa: this.form.get("nombreEmpresa")?.value,
      importeMensual: this.form.get("importeMensual")?.value,
      fechaInicioConvenio: this.datePipe.transform(this.form.get("fechaInicioConvenio")?.value, 'YYYY-MM-dd'),
      fechaFinConvenio: this.datePipe.transform(this.form.get("fechaFinConvenio")?.value, 'YYYY-MM-dd'),
      litrosLimite: this.form.get("litrosLimite")?.value,
      ooad: this.form.get("ooad")?.value,
      folioInicial: this.form.get("folioInicial")?.value,
      folioFinal: this.form.get("folioFinal")?.value,
      km: this.form.get("km")?.value,
      estatus: this.form.get("estatus")?.value,
      matricula: "0123456789" //Matricula del Usuario Logueado
    };
    this.vehiculoPropioService.guardar(tarjetaElectronica).subscribe(
      (respuesta) => {
        this.alertaService.mostrar("exito", this.ALTA_VEHICULO_PROPIO);
        this.cargadorService.desactivar();
        this.router.navigate(["../"], { relativeTo: this.route });
      },
      (error: HttpErrorResponse) => {
        this.cargadorService.desactivar();
        console.error("ERROR: ", error)
      }
    );
  }

  get f() {
    return this.form.controls;
  }

}