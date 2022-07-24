import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { Unidad } from 'src/app/modelos/unidad.interface';

@Component({
  selector: 'app-detalle-vehiculo-propio',
  templateUrl: './detalle-vehiculo-propio.component.html',
  styleUrls: ['./detalle-vehiculo-propio.component.scss']
})
export class DetalleVehiculoPropioComponent implements OnInit {

  tarjetaCirculacion!: CustomFile;
  verificacion!: CustomFile;
  polizaSeguro!: CustomFile;
  fotografiaFrente!: CustomFile;
  fotografiaLateralDerecho!: CustomFile;
  fotografiaLateralIzquierdo!: CustomFile;
  fotografiaTrasera!: CustomFile;

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
  readonly POSICION_VEHICULO_PROPIO = 10;
  readonly POSICION_ARCHIVO_TARJETA_CIRC = 11;

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
    let vehiculoPropio = respuesta[this.POSICION_VEHICULO_PROPIO].datos[0];
    this.idVehiculo = vehiculoPropio.idVehiculo;
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
    this.inicializarForm(vehiculoPropio);
    this.inicializarArchivos(vehiculoPropio);
  }

  // numPoliza REGRESA NULL       desEstatusEnajenacion REGRESA NULL    y    desVersionVehiculo REGRESA NULL
  // Se consultan los archivos como vacío
  inicializarForm(vehiculoPropio: any): void {
    this.form = this.formBuilder.group({
      ecco: new FormControl({ value: vehiculoPropio.cveEcco, disabled: true }, [Validators.required, Validators.maxLength(10)]),
      noInventario: new FormControl({ value: vehiculoPropio.numInventario, disabled: true }, [Validators.required, Validators.maxLength(12)]),
      noSerie: new FormControl({ value: vehiculoPropio.numSerie, disabled: true }, [Validators.required, Validators.maxLength(14)]),
      noTarjeton: new FormControl({ value: vehiculoPropio.numTarjeton, disabled: true }, [Validators.required, Validators.maxLength(10)]),
      tipoVehiculo: new FormControl({ value: parseInt(vehiculoPropio.desTipoVehiculo), disabled: true }, [Validators.required, Validators.maxLength(15)]),
      clasifVehiculo: new FormControl({ value: parseInt(vehiculoPropio.desClasifConuee), disabled: true }, [Validators.required, Validators.maxLength(15)]),
      tipoServicio: new FormControl({ value: parseInt(vehiculoPropio.desTipoServicio), disabled: true }, [Validators.required, Validators.maxLength(30)]),
      version: new FormControl({ value: parseInt(vehiculoPropio.desVersionVehiculo), disabled: true }, [Validators.required, Validators.maxLength(20)]),
      marca: new FormControl({ value: vehiculoPropio.desMarca, disabled: true }, [Validators.required, Validators.maxLength(30)]),
      clase: new FormControl({ value: vehiculoPropio.desClase, disabled: true }, [Validators.required, Validators.maxLength(30)]),
      submarca: new FormControl({ value: vehiculoPropio.desSubmarca, disabled: true }, [Validators.required, Validators.maxLength(20)]),
      modelo: new FormControl({ value: vehiculoPropio.desModelo, disabled: true }, [Validators.required, Validators.maxLength(4)]),
      combustible: new FormControl({ value: parseInt(vehiculoPropio.desCombustible), disabled: true }, [Validators.required, Validators.maxLength(15)]),
      cantCombus: new FormControl({ value: vehiculoPropio.desCombustibleXLitro, disabled: true }, [Validators.required, Validators.maxLength(10)]),
      capPersonas: new FormControl({ value: vehiculoPropio.canCapacidadPersonas, disabled: true }, [Validators.required, Validators.maxLength(3)]),
      capToneladas: new FormControl({ value: vehiculoPropio.canToneladas, disabled: true }, [Validators.required, Validators.maxLength(3)]),
      cilindros: new FormControl({ value: vehiculoPropio.canCilindros, disabled: true }, [Validators.required, Validators.maxLength(1)]),
      noMotor: new FormControl({ value: vehiculoPropio.numMotor, disabled: true }, [Validators.required, Validators.maxLength(20)]),
      valorContable: new FormControl({ value: vehiculoPropio.impValorContable, disabled: true }, [Validators.required, Validators.maxLength(10)]),
      placas: new FormControl({ value: vehiculoPropio.numPlacas, disabled: true }, [Validators.required, Validators.maxLength(8)]),
      licCofepris: new FormControl({ value: vehiculoPropio.numLicenciaCofepris, disabled: true }, [Validators.required, Validators.maxLength(10)]),
      venLicCofepris: new FormControl({ value: this.datePipe.transform(vehiculoPropio.fecVencimientoCofepris, 'dd/MM/YYYY'), disabled: true }, Validators.required),
      tipoRegimen: new FormControl({ value: parseInt(vehiculoPropio.desTipoRegimen), disabled: true }, Validators.required),
      unidad: new FormControl({ value: vehiculoPropio.idUnidadAdscripcion, disabled: true }, Validators.required),
      cp: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(5)]),
      entidad: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(150)]),
      municipio: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(150)]),
      colonia: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(150)]),
      respBienes: new FormControl({ value: vehiculoPropio.nomResponsableBienes, disabled: true }, [Validators.required, Validators.maxLength(20)]),
      estatus: new FormControl({ value: parseInt(vehiculoPropio.desEstatusVehiculo), disabled: true }, [Validators.required, Validators.maxLength(30)]),
      fechaBaja: new FormControl({ value: this.datePipe.transform(vehiculoPropio.fecBaja, 'dd/MM/YYYY'), disabled: true }, Validators.required),
      motivo: new FormControl({ value: vehiculoPropio.desMotivoBaja, disabled: true }, Validators.required),
      estatusEnajenacion: new FormControl({ value: vehiculoPropio.desEstatusEnajenacion, disabled: true }, [Validators.required, Validators.maxLength(30)]),
      aseguradora: new FormControl({ value: vehiculoPropio.idAseguradora, disabled: true }, Validators.required),
      fechaVencimiento: new FormControl({ value: this.datePipe.transform(vehiculoPropio.fecVencTarjetaCirculacion, 'dd/MM/YYYY'), disabled: true }, Validators.required),
      fechaProximaVerificacion: new FormControl({ value: this.datePipe.transform(vehiculoPropio.fecProxVerificacion, 'dd/MM/YYYY'), disabled: true }, Validators.required),
      fechaVencimientoPoliza: new FormControl({ value: this.datePipe.transform(vehiculoPropio.fecVencPoliza, 'dd/MM/YYYY'), disabled: true }, Validators.required)
    });
  }

  inicializarArchivos(vehiculoPropio: any) {
    this.tarjetaCirculacion = {
      ruta: vehiculoPropio.desRutaArchivoTjetaCirc
    };

    this.verificacion = {
      ruta: vehiculoPropio.desRutaVerificacion
    };

    this.polizaSeguro = {
      ruta: vehiculoPropio.desRutaPolizaSeguro
    };

    this.fotografiaFrente = {
      ruta: vehiculoPropio.desRutaFotoFrente
    };

    this.fotografiaLateralIzquierdo = {
      ruta: vehiculoPropio.desRutaFotoLateralIzq
    };

    this.fotografiaLateralDerecho = {
      ruta: vehiculoPropio.desRutaFotoLateralDer
    };

    this.fotografiaTrasera = {
      ruta: vehiculoPropio.desRutaFotoTrasera
    };

  }

  validarArchivo(event: any) {
    console.log(event);
  }

}
