import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { Unidad } from 'src/app/modelos/unidad.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { ArchivoService } from 'src/app/servicios/archivo-service';
import { TRANSPORTES_USUARIO } from 'src/app/servicios/seguridad/autenticacion.service';
import { convierteBlobEnFile } from 'src/app/utilerias/funciones-utilerias';
import { CatalogoVehiculosPropiosService } from '../../servicios/catalogo-vehiculos-propios.service';

@Component({
  selector: 'app-editar-vehiculo-propio',
  templateUrl: './editar-vehiculo-propio.component.html',
  styleUrls: ['./editar-vehiculo-propio.component.scss']
})
export class EditarVehiculoPropioComponent implements OnInit {

  tarjetaCirculacion!: CustomFile;
  verificacion!: CustomFile;
  polizaSeguro!: CustomFile;
  fotografiaFrente!: CustomFile;
  fotografiaLateralDerecho!: CustomFile;
  fotografiaLateralIzquierdo!: CustomFile;
  fotografiaTrasera!: CustomFile;

  readonly ACTUALIZA_VEHICULO = "El vehículo propio ha sido guardado exitosamente";
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
  idVehiculo!: number;

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService,
    private vehiculoPropioService: CatalogoVehiculosPropiosService,
    private archivoService: ArchivoService
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
    this.inicializarForm(vehiculoPropio);
    this.inicializarArchivos(vehiculoPropio);
  }

  // numPoliza REGRESA NULL       desEstatusEnajenacion REGRESA NULL    y    desVersionVehiculo REGRESA NULL
  // Se consultan los archivos como vacío
  inicializarForm(vehiculoPropio: any): void {
    this.form = this.formBuilder.group({
      ecco: new FormControl(vehiculoPropio.cveEcco, [Validators.required, Validators.maxLength(10)]),
      noInventario: new FormControl(vehiculoPropio.numInventario, [Validators.required, Validators.maxLength(12)]),
      noSerie: new FormControl(vehiculoPropio.numSerie, [Validators.required, Validators.maxLength(14)]),
      noTarjeton: new FormControl(vehiculoPropio.numTarjeton, [Validators.required, Validators.maxLength(10)]),
      tipoVehiculo: new FormControl(parseInt(vehiculoPropio.desTipoVehiculo), [Validators.required, Validators.maxLength(15)]),
      clasifVehiculo: new FormControl(parseInt(vehiculoPropio.desClasifConuee), [Validators.required, Validators.maxLength(15)]),
      tipoServicio: new FormControl(parseInt(vehiculoPropio.desTipoServicio), [Validators.required, Validators.maxLength(30)]),
      version: new FormControl(parseInt(vehiculoPropio.desVersionVehiculo), [Validators.required, Validators.maxLength(20)]),
      marca: new FormControl(vehiculoPropio.desMarca, [Validators.required, Validators.maxLength(30)]),
      clase: new FormControl(vehiculoPropio.desClase, [Validators.required, Validators.maxLength(30)]),
      submarca: new FormControl(vehiculoPropio.desSubmarca, [Validators.required, Validators.maxLength(20)]),
      modelo: new FormControl(vehiculoPropio.desModelo, [Validators.required, Validators.maxLength(4)]),
      combustible: new FormControl(parseInt(vehiculoPropio.desCombustible), [Validators.required, Validators.maxLength(15)]),
      cantCombus: new FormControl(vehiculoPropio.desCombustibleXLitro, [Validators.required, Validators.maxLength(10)]),
      capPersonas: new FormControl(vehiculoPropio.canCapacidadPersonas, [Validators.required, Validators.maxLength(3)]),
      capToneladas: new FormControl(vehiculoPropio.canToneladas, [Validators.required, Validators.maxLength(3)]),
      cilindros: new FormControl(vehiculoPropio.canCilindros, [Validators.required, Validators.maxLength(1)]),
      noMotor: new FormControl(vehiculoPropio.numMotor, [Validators.required, Validators.maxLength(20)]),
      valorContable: new FormControl(vehiculoPropio.impValorContable, [Validators.required, Validators.maxLength(10)]),
      placas: new FormControl(vehiculoPropio.numPlacas, [Validators.required, Validators.maxLength(8)]),
      licCofepris: new FormControl(vehiculoPropio.numLicenciaCofepris, [Validators.required, Validators.maxLength(10)]),
      venLicCofepris: new FormControl(this.datePipe.transform(vehiculoPropio.fecVencimientoCofepris, 'dd/MM/YYYY'), Validators.required),
      tipoRegimen: new FormControl(parseInt(vehiculoPropio.desTipoRegimen), Validators.required),
      unidad: new FormControl(vehiculoPropio.idUnidadAdscripcion, Validators.required),
      cp: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(5)]),
      entidad: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(150)]),
      municipio: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(150)]),
      colonia: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(150)]),
      respBienes: new FormControl(vehiculoPropio.nomResponsableBienes, [Validators.required, Validators.maxLength(20)]),
      estatus: new FormControl(parseInt(vehiculoPropio.desEstatusVehiculo), [Validators.required, Validators.maxLength(30)]),
      fechaBaja: new FormControl(this.datePipe.transform(vehiculoPropio.fecBaja, 'dd/MM/YYYY'), Validators.required),
      motivo: new FormControl(vehiculoPropio.desMotivoBaja, Validators.required),
      estatusEnajenacion: new FormControl(vehiculoPropio.desEstatusEnajenacion, [Validators.required, Validators.maxLength(30)]),
      aseguradora: new FormControl(vehiculoPropio.idAseguradora, Validators.required),
      fechaVencimiento: new FormControl(this.datePipe.transform(vehiculoPropio.fecVencTarjetaCirculacion, 'dd/MM/YYYY'), Validators.required),
      fechaProximaVerificacion: new FormControl(this.datePipe.transform(vehiculoPropio.fecProxVerificacion, 'dd/MM/YYYY'), Validators.required),
      fechaVencimientoPoliza: new FormControl(this.datePipe.transform(vehiculoPropio.fecVencPoliza, 'dd/MM/YYYY'), Validators.required)
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

  editar() {
    let usuarioAutenticado: any = JSON.parse(localStorage.getItem(TRANSPORTES_USUARIO) as string);
    this.cargadorService.activar();
    this.archivoService.obtenerArchivosDeCustomFiles(
      this.tarjetaCirculacion,
      this.verificacion,
      this.polizaSeguro,
      this.fotografiaFrente,
      this.fotografiaLateralDerecho,
      this.fotografiaLateralIzquierdo,
      this.fotografiaTrasera).pipe(
        switchMap((archivosRespuesta: File[]) => {
          let archivos = {
            tarjetaCirculacion: archivosRespuesta[0],
            verificacion: archivosRespuesta[1],
            polizaSeguro: archivosRespuesta[2],
            fotografiaFrente: archivosRespuesta[3],
            fotografiaLateralDerecho: archivosRespuesta[4],
            fotografiaLateralIzquierdo: archivosRespuesta[5],
            fotografiaTrasera: archivosRespuesta[6]
          };
          return this.vehiculoPropioService.actualizarRegistro(this.idVehiculo, this.form.value, usuarioAutenticado?.matricula, archivos)
        })
      ).subscribe(
        (respuesta) => {
          this.alertaService.mostrar("exito", this.ACTUALIZA_VEHICULO);
          this.cargadorService.desactivar();
          this.router.navigate(["../"], { relativeTo: this.route });
        },
        (error: HttpErrorResponse) => {
          this.cargadorService.desactivar();
        }
      );
  }

  get f() {
    return this.form.controls;
  }

  get estanLosArchivosCargados(): boolean {
    let archivosCargados: boolean = false;
    if (this.tarjetaCirculacion &&
      this.verificacion &&
      this.polizaSeguro &&
      this.fotografiaFrente &&
      this.fotografiaLateralDerecho &&
      this.fotografiaLateralIzquierdo &&
      this.fotografiaTrasera) {
      archivosCargados = true;
    }
    return archivosCargados;
  }

}
