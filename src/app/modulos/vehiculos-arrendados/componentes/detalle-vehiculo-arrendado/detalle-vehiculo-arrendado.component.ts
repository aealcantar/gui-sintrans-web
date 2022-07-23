import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { Unidad } from 'src/app/modelos/unidad.interface';

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
  idVehiculo!: number;

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    let respuesta = this.route.snapshot.data["respuesta"];
    let vehiculoArrendado = respuesta[this.POSICION_VEHICULO_ARRENDADO].datos[0];
    console.log("DATOS: ", vehiculoArrendado);
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
    this.inicializarForm(vehiculoArrendado);
  }

  inicializarForm(vehiculoArrendado: any): void {
    this.form = this.formBuilder.group({
      ecco: new FormControl({ value: vehiculoArrendado.cveEcco, disabled: true }, Validators.required),
      noTarjeton: new FormControl({ value: vehiculoArrendado.numTarjeton, disabled: true }, Validators.required),
      idTipoVehiculo: new FormControl({ value: vehiculoArrendado.desTipoVehiculo, disabled: true }, Validators.required),
      modelo: new FormControl({ value: vehiculoArrendado.desModelo, disabled: true }, Validators.required),
      idClasifConuee: new FormControl({ value: vehiculoArrendado.desClasifConuee, disabled: true }, Validators.required),
      idTipoServicio: new FormControl({ value: vehiculoArrendado.desTipoServicio, disabled: true }, Validators.required),
      submarca: new FormControl({ value: vehiculoArrendado.desSubmarca, disabled: true }, Validators.required),
      idCilindro: new FormControl({ value: vehiculoArrendado.canCilindros, disabled: true }, Validators.required),
      idCombustible: new FormControl({ value: vehiculoArrendado.desCombustible, disabled: true }, Validators.required),
      idCantCombustiblePorLitro: new FormControl({ value: vehiculoArrendado.desCombustibleXLitro, disabled: true }, Validators.required),
      capacidadPersonas: new FormControl({ value: vehiculoArrendado.canCapacidadPersonas, disabled: true }, Validators.required),
      idCapToneladas: new FormControl({ value: vehiculoArrendado.canToneladas, disabled: true }, Validators.required),
      placas: new FormControl({ value: vehiculoArrendado.numPlacas, disabled: true }, Validators.required),
      licCofepris: new FormControl({ value: vehiculoArrendado.numLicenciaCofepris, disabled: true }, Validators.required),
      vencLicCofepris: new FormControl({ value: this.datePipe.transform(vehiculoArrendado.fecVencimientoCofepris, 'dd/MM/YYYY'), disabled: true }, Validators.required),
      idTipoRegimen: new FormControl({ value: vehiculoArrendado.desTipoRegimen, disabled: true }, Validators.required),
      idUnidad: new FormControl({ value: vehiculoArrendado.idUnidadAdscripcion, disabled: true }, Validators.required),
      codigoPostal: new FormControl({ value: null, disabled: true }, Validators.required), //NO VIENE DATO
      entidad: new FormControl({ value: null, disabled: true }, Validators.required), //NO VIENE DATO
      municipio: new FormControl({ value: null, disabled: true }, Validators.required), //NO VIENE DATO
      colonia: new FormControl({ value: null, disabled: true }, Validators.required), //NO VIENE DATO
      nombreArrendadora: new FormControl({ value: vehiculoArrendado.indArrendado, disabled: true }, Validators.required),
      idNoContrato: new FormControl({ value: null, disabled: true }, Validators.required), //NO VIENE DATO
      fechaInicioContrato: new FormControl({ value: null, disabled: true }, Validators.required), //NO VIENE DATO
      fechaFinContrato: new FormControl({ value: null, disabled: true }, Validators.required), //NO VIENE DATO
      costoDiario: new FormControl({ value: null, disabled: true }, Validators.required), //NO VIENE DATO
      costoMensual: new FormControl({ value: null, disabled: true }, Validators.required), //NO VIENE DATO
      idEstatus: new FormControl({ value: vehiculoArrendado.desEstatusVehiculo, disabled: true }, Validators.required),
      nombreAseguradora: new FormControl({ value: null, disabled: true }, Validators.required), //NO VIENE DATO
      poliza: new FormControl({ value: vehiculoArrendado.numPoliza, disabled: true }, Validators.required),
      auxiliarContable: new FormControl({ value: vehiculoArrendado.numAuxiliar, disabled: true }, Validators.required),
      vehiculoSustituto: new FormControl({ value: null, disabled: true }, Validators.required), //NO VIENE DATO
    });
  }


  get f() {
    return this.form.controls;
  }

}
