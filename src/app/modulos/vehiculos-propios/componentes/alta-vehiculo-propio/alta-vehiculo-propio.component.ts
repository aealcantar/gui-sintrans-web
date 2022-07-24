import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { TipoDropdown } from 'src/app/modelos/tipo-dropdown';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { TRANSPORTES_USUARIO } from 'src/app/servicios/seguridad/autenticacion.service';
import { mapearArregloTipoDropdown } from 'src/app/utilerias/funciones-utilerias';
import { CatalogoVehiculosPropiosService } from '../../servicios/catalogo-vehiculos-propios.service';

@Component({
  selector: 'app-alta-vehiculo-propio',
  templateUrl: './alta-vehiculo-propio.component.html',
  styleUrls: ['./alta-vehiculo-propio.component.scss'],
  providers: [DatePipe]
})
export class AltaVehiculoPropioComponent implements OnInit {

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
  readonly ALTA_VEHICULO_PROPIO = "La vehículo propio ha sido dado de alta exitosamente.";

  tarjetaCirculacion!: CustomFile;
  verificacion!: CustomFile;
  polizaSeguro!: CustomFile;
  fotografiaFrente!: CustomFile;
  fotografiaLateralDerecho!: CustomFile;
  fotografiaLateralIzquierdo!: CustomFile;
  fotografiaTrasera!: CustomFile;

  respuesta!: HttpRespuesta<any> | null;

  catUnidades: TipoDropdown[] = [];
  catTipoVehiculo: TipoDropdown[] = [];
  catCONUEE: TipoDropdown[] = [];
  catTipoServicio: TipoDropdown[] = [];
  catVersion: TipoDropdown[] = [];
  catTipoRegimen: TipoDropdown[] = [];
  catCombustible: TipoDropdown[] = [];
  catToneladas: TipoDropdown[] = [];
  catCilindros: TipoDropdown[] = [];
  catEstatus: TipoDropdown[] = [];

  catTipoServicioCONUEE: any[] = [];

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService,
    private vehiculoPropioService: CatalogoVehiculosPropiosService
  ) { }

  ngOnInit(): void {
    let respuesta = this.route.snapshot.data["respuesta"];
    this.catTipoServicioCONUEE = respuesta[this.POSICION_CATALOGO_TIPO_SERVICIO];
    this.catUnidades = mapearArregloTipoDropdown(respuesta[this.POSICION_CATALOGO_UNIDADES].datos.content, 'nomUnidadAdscripcion', 'idUnidad');
    this.catTipoVehiculo = mapearArregloTipoDropdown(respuesta[this.POSICION_CATALOGO_TIPO_VEHICULO], 'descripcion', 'idTipoVehiculo');
    this.catCONUEE = mapearArregloTipoDropdown(respuesta[this.POSICION_CATALOGO_CONUEE], 'descripcion', 'idClasificacionCONUEE');
    this.catVersion = mapearArregloTipoDropdown(respuesta[this.POSICION_CATALOGO_VERSION], 'descripcion', 'idVersion');
    this.catTipoRegimen = mapearArregloTipoDropdown(respuesta[this.POSICION_CATALOGO_TIPO_REGIMEN], 'descripcion', 'idTipoRegimen');
    this.catCombustible = mapearArregloTipoDropdown(respuesta[this.POSICION_CATALOGO_COMBUSTIBLE], 'descripcion', 'idCombustible');
    this.catToneladas = mapearArregloTipoDropdown(respuesta[this.POSICION_CATALOGO_TONELADAS], 'descripcion', 'idTonelada');
    this.catCilindros = mapearArregloTipoDropdown(respuesta[this.POSICION_CATALOGO_CILINDROS], 'descripcion', 'idCilindro');
    this.catEstatus = mapearArregloTipoDropdown(respuesta[this.POSICION_CATALOGO_ESTATUS], 'descripcion', 'idEstatus');
    this.inicializarForm();

  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      ecco: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      noInventario: new FormControl(null, [Validators.required, Validators.maxLength(12)]),
      noSerie: new FormControl(null, [Validators.required, Validators.maxLength(14)]),
      noTarjeton: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      tipoVehiculo: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      clasifVehiculo: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      tipoServicio: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      version: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      marca: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      clase: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      submarca: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      modelo: new FormControl(null, [Validators.required, Validators.maxLength(4)]),
      combustible: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      cantCombus: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      capPersonas: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      capToneladas: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      cilindros: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
      noMotor: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      valorContable: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      placas: new FormControl(null, [Validators.required, Validators.maxLength(8)]),
      licCofepris: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      venLicCofepris: new FormControl(null, Validators.required),
      tipoRegimen: new FormControl(null, Validators.required),
      unidad: new FormControl(null, Validators.required),
      cp: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(5)]),
      entidad: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(150)]),
      municipio: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(150)]),
      colonia: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(150)]),
      respBienes: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      estatus: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      fechaBaja: new FormControl(null, Validators.required),
      motivo: new FormControl(null, Validators.required),
      estatusEnajenacion: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      aseguradora: new FormControl(null, Validators.required),
      fechaVencimiento: new FormControl(null, Validators.required),
      fechaProximaVerificacion: new FormControl(null, Validators.required),
      fechaVencimientoPoliza: new FormControl(null, Validators.required)
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
    let usuarioAutenticado: any = JSON.parse(localStorage.getItem(TRANSPORTES_USUARIO) as string);
    let archivos = {
      tarjetaCirculacion: this.tarjetaCirculacion.archivo,
      verificacion: this.verificacion.archivo,
      polizaSeguro: this.polizaSeguro.archivo,
      fotografiaFrente: this.fotografiaFrente.archivo,
      fotografiaLateralDerecho: this.fotografiaLateralDerecho.archivo,
      fotografiaLateralIzquierdo: this.fotografiaLateralIzquierdo.archivo,
      fotografiaTrasera: this.fotografiaTrasera.archivo
    }
    this.cargadorService.activar();
    this.vehiculoPropioService.guardarRegistro(this.form.value, usuarioAutenticado?.matricula, archivos).subscribe(
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