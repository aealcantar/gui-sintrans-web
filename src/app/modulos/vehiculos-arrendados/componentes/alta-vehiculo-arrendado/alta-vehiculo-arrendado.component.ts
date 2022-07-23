import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { Unidad } from 'src/app/modelos/unidad.interface';
import { CatalogoVehiculosPropiosService } from 'src/app/modulos/vehiculos-propios/servicios/catalogo-vehiculos-propios.service';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { TRANSPORTES_USUARIO } from 'src/app/servicios/seguridad/autenticacion.service';
import { VehiculosArrendadosService } from '../../servicios/vehiculos-arrendados.service';

@Component({
  selector: 'app-alta-vehiculo-arrendado',
  templateUrl: './alta-vehiculo-arrendado.component.html',
  styleUrls: ['./alta-vehiculo-arrendado.component.scss']
})
export class AltaVehiculoArrendadoComponent implements OnInit {

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
    private vehiculoArrendadosService: VehiculosArrendadosService
  ) { }

  ngOnInit(): void {
    let respuesta = this.route.snapshot.data["respuesta"];
    this.catUnidades = respuesta[this.POSICION_CATALOGO_UNIDADES].datos.content.map(
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
      ecco: new FormControl(null, Validators.required),
      noTarjeton: new FormControl(null, Validators.required),
      idTipoVehiculo: new FormControl(null, Validators.required),
      modelo: new FormControl(null, Validators.required),
      idClasifConuee: new FormControl(null, Validators.required),
      idTipoServicio: new FormControl(null, Validators.required),
      submarca: new FormControl(null, Validators.required),
      idCilindro: new FormControl(null, Validators.required),
      idCombustible: new FormControl(null, Validators.required),
      idCantCombustiblePorLitro: new FormControl(null, Validators.required),
      capPersonas: new FormControl(null, Validators.required),
      idCapToneladas: new FormControl(null, Validators.required),
      placas: new FormControl(null, Validators.required),
      licCofepris: new FormControl(null, Validators.required),
      vencLicCofepris: new FormControl(null, Validators.required),
      idTipoRegimen: new FormControl(null, Validators.required),
      idUnidad: new FormControl(null, Validators.required),
      codigoPostal: new FormControl({ value: null, disabled: true }, Validators.required),
      entidad: new FormControl({ value: null, disabled: true }, Validators.required),
      municipio: new FormControl({ value: null, disabled: true }, Validators.required),
      colonia: new FormControl({ value: null, disabled: true }, Validators.required),
      nombreArrendadora: new FormControl(null, Validators.required),
      idNoContrato: new FormControl(null, Validators.required),
      fechaInicioContrato: new FormControl(null, Validators.required),
      fechaFinContrato: new FormControl(null, Validators.required),
      costoDiario: new FormControl(null, Validators.required),
      costoMensual: new FormControl(null, Validators.required),
      idEstatus: new FormControl(null, Validators.required),
      nombreAseguradora: new FormControl(null, Validators.required),
      poliza: new FormControl(null, Validators.required),
      auxiliarContable: new FormControl(null, Validators.required),
      vehiculoSustituto: new FormControl(null, Validators.required),
    });
  }

  validarArchivo(event: any) {
    console.log(event);
  }

  llenarCatalogoTipoServicio(event: any): void {
    this.catTipoServicio = this.catTipoServicioCONUEE.filter((c) => c.idClasificacionCONUEE === event.value).map(
      (tipoServicio: any) => (
        {
          label: tipoServicio.descripcion,
          value: tipoServicio.idTipoServicio
        }
      )
    );
  }

  guardar() {
    console.log("DATOS: ", this.form.value);
    let usuarioAutenticado: any = JSON.parse(localStorage.getItem(TRANSPORTES_USUARIO) as string);
    // let archivos = {
    //   tarjetaCirculacion: this.tarjetaCirculacion[0],
    //   verificacion: this.verificacion[0],
    //   polizaSeguro: this.polizaSeguro[0],
    //   fotografiaFrente: this.fotografiaFrente[0],
    //   fotografiaLateralDerecho: this.fotografiaLateralDerecho[0],
    //   fotografiaLateralIzquierdo: this.fotografiaLateralIzquierdo[0],
    //   fotografiaTrasera: this.fotografiaTrasera[0]
    // }
    this.cargadorService.activar();
    // this.vehiculoArrendadosService.guardarRegistro(this.form.value, usuarioAutenticado?.matricula, archivos).subscribe(
    //   (respuesta) => {
    //     this.alertaService.mostrar("exito", this.ALTA_VEHICULO_PROPIO);
    //     this.cargadorService.desactivar();
    //     this.router.navigate(["../"], { relativeTo: this.route });
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.cargadorService.desactivar();
    //     console.error("ERROR: ", error)
    //   }
    // );
  }

  get f() {
    return this.form.controls;
  }

}
