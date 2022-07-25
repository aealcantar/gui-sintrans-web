import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { Unidad } from 'src/app/modelos/unidad.interface';
import { CatalogoUnidadesService } from 'src/app/modulos/catalogo-unidades/servicios/catalogo-unidades.service';

@Component({
  selector: 'app-detalle-vehiculo-arrendado',
  templateUrl: './detalle-vehiculo-arrendado.component.html',
  styleUrls: ['./detalle-vehiculo-arrendado.component.scss']
})
export class DetalleVehiculoArrendadoComponent implements OnInit {
  
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
  //TEMPORAL
  catContratos: any[] = [];
  idVehiculo!: number;

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private unidadService: CatalogoUnidadesService
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
    this.inicializarForm(vehiculoArrendado);
    this.consultaDatosPorIdUnidad(vehiculoArrendado.idUnidadAdscripcion);
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
      ecco: new FormControl({ value: vehiculoArrendado.cveEcco, disabled: true }, Validators.required),
      noTarjeton: new FormControl({ value: vehiculoArrendado.numTarjeton, disabled: true }, Validators.required),
      idTipoVehiculo: new FormControl({ value: parseInt(vehiculoArrendado.desTipoVehiculo), disabled: true }, Validators.required),
      modelo: new FormControl({ value: vehiculoArrendado.desModelo, disabled: true }, Validators.required),
      idClasifConuee: new FormControl({ value: parseInt(vehiculoArrendado.desClasifConuee), disabled: true }, Validators.required),
      idTipoServicio: new FormControl({ value: parseInt(vehiculoArrendado.desTipoServicio), disabled: true }, Validators.required),
      submarca: new FormControl({ value: vehiculoArrendado.desSubmarca, disabled: true }, Validators.required),
      idCilindro: new FormControl({ value: vehiculoArrendado.canCilindros, disabled: true }, Validators.required),
      idCombustible: new FormControl({ value: parseInt(vehiculoArrendado.desCombustible), disabled: true }, Validators.required),
      idCantCombustiblePorLitro: new FormControl({ value: vehiculoArrendado.desCombustibleXLitro, disabled: true }, Validators.required),
      capacidadPersonas: new FormControl({ value: vehiculoArrendado.canCapacidadPersonas, disabled: true }, Validators.required),
      idCapToneladas: new FormControl({ value: vehiculoArrendado.canToneladas, disabled: true }, Validators.required),
      placas: new FormControl({ value: vehiculoArrendado.numPlacas, disabled: true }, Validators.required),
      licCofepris: new FormControl({ value: vehiculoArrendado.numLicenciaCofepris, disabled: true }, Validators.required),
      vencLicCofepris: new FormControl({ value: vehiculoArrendado.fecVencimientoCofepris ? new Date(vehiculoArrendado.fecVencimientoCofepris) : null, disabled: true }, Validators.required),
      idTipoRegimen: new FormControl({ value: parseInt(vehiculoArrendado.desTipoRegimen), disabled: true }, Validators.required),
      idUnidad: new FormControl({ value: vehiculoArrendado.idUnidadAdscripcion, disabled: true }, Validators.required),
      codigoPostal: new FormControl({ value: null, disabled: true }, Validators.required),
      entidad: new FormControl({ value: null, disabled: true }, Validators.required),
      municipio: new FormControl({ value: null, disabled: true }, Validators.required),
      colonia: new FormControl({ value: null, disabled: true }, Validators.required),
      nombreArrendadora: new FormControl({ value: vehiculoArrendado.indArrendado, disabled: true }, Validators.required),
      idNoContrato: new FormControl({ value: vehiculoArrendado.arrendatarios.numContrato, disabled: true }, Validators.required),
      fechaInicioContrato: new FormControl({ value: vehiculoArrendado.arrendatarios.fecIniContrato ? new Date(vehiculoArrendado.arrendatarios.fecIniContrato) : null, disabled: true }, Validators.required),
      fechaFinContrato: new FormControl({ value: vehiculoArrendado.arrendatarios.fecFinContrato ? new Date(vehiculoArrendado.arrendatarios.fecFinContrato) : null, disabled: true }, Validators.required),
      costoDiario: new FormControl({ value: vehiculoArrendado.arrendatarios.impCostoDiario, disabled: true }, Validators.required),
      costoMensual: new FormControl({ value: vehiculoArrendado.arrendatarios.impCostoMensual, disabled: true }, Validators.required),
      idEstatus: new FormControl({ value: parseInt(vehiculoArrendado.desEstatusVehiculo), disabled: true }, Validators.required),
      nombreAseguradora: new FormControl({ value: vehiculoArrendado.arrendatarios.nomArrendadora, disabled: true }, Validators.required),
      poliza: new FormControl({ value: vehiculoArrendado.numPoliza, disabled: true }, Validators.required),
      auxiliarContable: new FormControl({ value: vehiculoArrendado.numAuxiliar, disabled: true }, Validators.required),
      vehiculoSustituto: new FormControl({ value: vehiculoArrendado.indSustituto === 1 ? true : false, disabled: true }, Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

}
