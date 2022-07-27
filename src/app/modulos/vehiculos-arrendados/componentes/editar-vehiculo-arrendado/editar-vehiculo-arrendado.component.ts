import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { TipoDropdown } from 'src/app/modelos/tipo-dropdown';
import { Unidad } from 'src/app/modelos/unidad.interface';
import { CatalogoUnidadesService } from 'src/app/modulos/catalogo-unidades/servicios/catalogo-unidades.service';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { TRANSPORTES_USUARIO } from 'src/app/servicios/seguridad/autenticacion.service';
import { mapearArregloTipoDropdown } from 'src/app/utilerias/funciones-utilerias';
import { VehiculosArrendadosService } from '../../servicios/vehiculos-arrendados.service';

@Component({
  selector: 'app-editar-vehiculo-arrendado',
  templateUrl: './editar-vehiculo-arrendado.component.html',
  styleUrls: ['./editar-vehiculo-arrendado.component.scss']
})
export class EditarVehiculoArrendadoComponent implements OnInit {
  
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
  readonly POSICION_VEHICULO_ARRENDADO = 10;
  //TEMPORAL
  readonly POSICION_CATALOGO_NUMERO_CONTRATOS = 11;
  readonly POSICION_CATALOGO_ASEGURADORAS = 12;
  readonly ACTUALIZA_VEHICULO_ARRENDADO = "El vehículo arrendado ha sido guardado exitosamente.";
  respuesta!: HttpRespuesta<any> | null;
  catUnidades: Unidad[] = [];
  catTipoVehiculo: any[] = [];
  catCONUEE: any[] = [];
  catTipoServicioCONUEE: any[] = [];
  catTipoServicio: any[] = [];
  catVersion: any[] = [];
  catTipoRegimen: any[] = [];
  catCombustible: any[] = [];
  catToneladas: any[] = [];
  catCilindros: any[] = [];
  catEstatus: any[] = [];
  //TEMPORAL
  catContratos: any[] = [];
  catAseguradoras: TipoDropdown[] = [];
  idVehiculo!: number;

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private cargadorService: CargadorService,
    private alertaService: AlertasFlotantesService,
    private unidadService: CatalogoUnidadesService,
    private vehiculoArrendadosService: VehiculosArrendadosService
  ) { }

  ngOnInit(): void {
    let respuesta = this.route.snapshot.data["respuesta"];
    let vehiculoArrendado = respuesta[this.POSICION_VEHICULO_ARRENDADO].datos[0];
    this.idVehiculo = vehiculoArrendado.idVehiculo;
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
    this.catContratos = respuesta[this.POSICION_CATALOGO_NUMERO_CONTRATOS].map(
      (contrato: any) => (
        {
          label: contrato.descripcion,
          value: contrato.idContrato
        }
      )
    );
    this.catAseguradoras = mapearArregloTipoDropdown(respuesta[this.POSICION_CATALOGO_ASEGURADORAS].datos.content, 'nombreAseguradora', 'idAseguradora');
    this.inicializarForm(vehiculoArrendado);
    this.consultaDatosPorIdUnidad(vehiculoArrendado.idUnidadAdscripcion);
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

  consultaDatosPorIdUnidad(idUnidadAdscripcion: number): void {
    this.unidadService.buscarPorId(idUnidadAdscripcion).subscribe(
      (respuesta) => {
        this.form.controls['codigoPostal'].setValue(respuesta.datos.codigoPostal.cveCodigoPostal);
        this.form.controls['entidad'].setValue(respuesta.datos.codigoPostal.idMunicipio.entidades.nomEntidad);
        this.form.controls['municipio'].setValue(respuesta.datos.codigoPostal.idMunicipio.nomMunicipio);
        this.form.controls['colonia'].setValue(respuesta.datos.nomColonia);
      }
    );
  }

  inicializarForm(vehiculoArrendado: any): void {
    this.form = this.formBuilder.group({
      ecco: new FormControl(vehiculoArrendado.cveEcco, Validators.required),
      noTarjeton: new FormControl(vehiculoArrendado.numTarjeton, Validators.required),
      idTipoVehiculo: new FormControl(parseInt(vehiculoArrendado.desTipoVehiculo), Validators.required),
      modelo: new FormControl(vehiculoArrendado.desModelo, Validators.required),
      idClasifConuee: new FormControl(parseInt(vehiculoArrendado.desClasifConuee), Validators.required),
      idTipoServicio: new FormControl(parseInt(vehiculoArrendado.desTipoServicio), Validators.required),
      submarca: new FormControl(vehiculoArrendado.desSubmarca, Validators.required),
      idCilindro: new FormControl(vehiculoArrendado.canCilindros, Validators.required),
      idCombustible: new FormControl(parseInt(vehiculoArrendado.desCombustible), Validators.required),
      idCantCombustiblePorLitro: new FormControl(vehiculoArrendado.desCombustibleXLitro, Validators.required),
      capPersonas: new FormControl(vehiculoArrendado.canCapacidadPersonas, Validators.required),
      idCapToneladas: new FormControl(vehiculoArrendado.canToneladas, Validators.required),
      placas: new FormControl(vehiculoArrendado.numPlacas, Validators.required),
      licCofepris: new FormControl(vehiculoArrendado.numLicenciaCofepris, Validators.required),
      vencLicCofepris: new FormControl(vehiculoArrendado.fecVencimientoCofepris ? new Date(vehiculoArrendado.fecVencimientoCofepris) : null, Validators.required),
      idTipoRegimen: new FormControl(parseInt(vehiculoArrendado.desTipoRegimen), Validators.required),
      idUnidad: new FormControl(vehiculoArrendado.idUnidadAdscripcion, Validators.required),
      codigoPostal: new FormControl({ value: null, disabled: true }, Validators.required),
      entidad: new FormControl({ value: null, disabled: true }, Validators.required),
      municipio: new FormControl({ value: null, disabled: true }, Validators.required),
      colonia: new FormControl({ value: null, disabled: true }, Validators.required),
      nombreArrendadora: new FormControl(vehiculoArrendado.arrendatarios.nomArrendadora, Validators.required),
      idNoContrato: new FormControl(vehiculoArrendado.arrendatarios.numContrato, Validators.required),
      fechaInicioContrato: new FormControl(vehiculoArrendado.arrendatarios.fecIniContrato ? new Date(vehiculoArrendado.arrendatarios.fecIniContrato) : null, Validators.required),
      fechaFinContrato: new FormControl(vehiculoArrendado.arrendatarios.fecFinContrato ? new Date(vehiculoArrendado.arrendatarios.fecFinContrato) : null, Validators.required),
      costoDiario: new FormControl(vehiculoArrendado.arrendatarios.impCostoDiario, Validators.required),
      costoMensual: new FormControl(vehiculoArrendado.arrendatarios.impCostoMensual, Validators.required),
      idEstatus: new FormControl(parseInt(vehiculoArrendado.desEstatusVehiculo), Validators.required),
      nombreAseguradora: new FormControl(vehiculoArrendado.idAseguradora, Validators.required),
      poliza: new FormControl(vehiculoArrendado.numPoliza, Validators.required),
      auxiliarContable: new FormControl(vehiculoArrendado.numAuxiliar, Validators.required),
      vehiculoSustituto: new FormControl(vehiculoArrendado.indSustituto === 1 ? true : false, Validators.required),
    });
  }

  editar(): void {
    let usuarioAutenticado: any = JSON.parse(localStorage.getItem(TRANSPORTES_USUARIO) as string);
    this.cargadorService.activar();
    let vehiculoArrendado: any = {
      cveEcco: this.form.get("ecco")?.value,
      numTarjeton: this.form.get("noTarjeton")?.value,
      desTipoVehiculo: this.form.get("idTipoVehiculo")?.value,
      desModelo: this.form.get("modelo")?.value,
      desClasifConuee: this.form.get("idClasifConuee")?.value,
      desTipoServicio: this.form.get("idTipoServicio")?.value,
      desSubmarca: this.form.get("submarca")?.value,
      canCilindros: this.form.get("idCilindro")?.value,
      desCombustible: this.form.get("idCombustible")?.value,
      desCombustibleXLitro: this.form.get("idCantCombustiblePorLitro")?.value,
      canCapacidadPersonas: this.form.get("capPersonas")?.value,
      canToneladas: this.form.get("idCapToneladas")?.value,
      numPlacas: this.form.get("placas")?.value,
      numLicenciaCofepris: this.form.get("licCofepris")?.value,
      fecVencimientoCofepris: this.datePipe.transform(this.form.get("vencLicCofepris")?.value, 'YYYY-MM-dd'),
      desTipoRegimen: this.form.get("idTipoRegimen")?.value,
      idUnidadAdscripcion: this.form.get("idUnidad")?.value,
      numAuxiliar: this.form.get("auxiliarContable")?.value,
      indSustituto: this.form.get("vehiculoSustituto")?.value === true ? 1 : 2,
      cveMatricula: usuarioAutenticado.matricula,
      desEstatusVehiculo: this.form.get("idEstatus")?.value,
      desClase: this.form.get("numeroConvenio")?.value,
      desRutaArchivoTjetaCirc: this.form.get("numeroConvenio")?.value,
      desRutaFotoFrente: this.form.get("numeroConvenio")?.value,
      desRutaFotoLateralDer: this.form.get("numeroConvenio")?.value,
      desRutaFotoLateralIzq: this.form.get("numeroConvenio")?.value,
      desRutaFotoTrasera: this.form.get("numeroConvenio")?.value,
      desRutaPolizaSeguro: this.form.get("numeroConvenio")?.value,
      desRutaVerificacion: this.form.get("numeroConvenio")?.value,
      idAseguradora: this.form.get("nombreAseguradora")?.value,
      numPoliza: this.form.get("poliza")?.value,
      arrendatarios: {
        nomArrendadora: this.form.get("nombreArrendadora")?.value,
        numContrato: this.form.get("idNoContrato")?.value,
        fecIniContrato: this.datePipe.transform(this.form.get("fechaInicioContrato")?.value, 'YYYY-MM-dd'),
        fecFinContrato: this.datePipe.transform(this.form.get("fechaFinContrato")?.value, 'YYYY-MM-dd'),
        impCostoDiario: this.form.get("costoDiario")?.value,
        impCostoMensual: this.form.get("costoMensual")?.value
      }
    }
    this.vehiculoArrendadosService.actualizarRegistro(this.idVehiculo, vehiculoArrendado).subscribe(
      (respuesta) => {
        this.alertaService.mostrar("exito", this.ACTUALIZA_VEHICULO_ARRENDADO);
        this.cargadorService.desactivar();
        this.router.navigate(["../.."], { relativeTo: this.route });
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
