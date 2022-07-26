import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { ChoferesService } from '../../servicios/choferes.service';
import { MatriculaService } from 'src/app/servicios/matricula.service';
import { AutenticacionService } from 'src/app/servicios/seguridad/autenticacion.service';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { CatalogoUnidadesService } from 'src/app/modulos/catalogo-unidades/servicios/catalogo-unidades.service';
import { ArchivoService } from 'src/app/servicios/archivo-service';
import {
  CATALOGO_ESTATUS_CHOFER,
  CATALOGO_ESTATUS_CHOFER_BAJA,
  CATALOGO_ESTATUS_CHOFER_BLOQUEADO
} from 'src/app/utilerias/catalogos';
import { Usuario } from 'src/app/modelos/usuario.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-chofer',
  templateUrl: './editar-chofer.component.html',
  styleUrls: ['./editar-chofer.component.scss'],
  providers: [DatePipe],
})
export class EditarChoferComponent implements OnInit {

  readonly ACTUALIZAR_CHOFER = "El registro se ha actualizado exitosamente.";
  readonly MATRICULA_DESACTIVADA = "La matrícula ingresada no está vigente.";
  readonly MATRICULA_INEXISTENTE = "La matrícula ingresada no existe.";
  readonly ID_CONTRATACION_SUSTITUTO = 8;
  readonly ID_ESTATUS_BAJA = 1;
  readonly ID_ESTATUS_BLOQUEADO = 2;
  readonly ID_ESTATUS_INCAPACIDAD = 9;
  public archivo!: CustomFile;
  public editForm!: FormGroup;
  public catEstatus: any[] = CATALOGO_ESTATUS_CHOFER;
  public catMotivo: any[] = [];
  public catAdscripciones: any[] = [];
  public desMotivoHasValidator: boolean = false;
  public tipoContratacion: number = 0;

  constructor(
    private rutaActiva: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService,
    private fb: FormBuilder,
    private choferesService: ChoferesService,
    private matriculaService: MatriculaService,
    private aut: AutenticacionService,
    private datePipe: DatePipe,
    private archivoService: ArchivoService,
    private unidadService: CatalogoUnidadesService,
  ) { }

  ngOnInit(): void {
    let matricula: string = '';
    this.aut.usuario$.subscribe((value: Usuario | null) => {
      matricula = value?.matricula || ''
    });
    this.inicializarFormulario(matricula);

    const idChofer = String(this.rutaActiva.snapshot.paramMap.get('idChofer'));
    if (idChofer) {
      this.obtenerChoferPorId(idChofer);
    }
  }

  inicializarFormulario(matricula: string) {
    this.editForm = this.fb.group({
      idChofer: new FormControl({ value: null, disabled: true }),
      nombreChofer: new FormControl({ value: null, disabled: true }, Validators.required),
      cveUnidadAdscripcion: new FormControl({ value: null, disabled: true }, Validators.required),
      idUnidadAdscripcion: new FormControl({ value: null, disabled: false }, Validators.required),
      cveUnidadOOAD: new FormControl({ value: null, disabled: true }, Validators.required),
      desCategoria: new FormControl({ value: null, disabled: true }, Validators.required),
      cveMatriculaChofer: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(12)])),
      cveMatricula: new FormControl(matricula, Validators.required),
      fecInicioContrato: new FormControl(null),
      fecFinContrato: new FormControl(null),
      fecIniIncapacidad: new FormControl(null),
      fecFinIncapacidad: new FormControl(null),
      estatusChofer: new FormControl(null, Validators.required),
      desMotivo: new FormControl(null),
      cveLicencia: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(10)])),
      cveTipoLicencia: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
      fecVigencia: new FormControl(null, Validators.required),
      fecExpedicion: new FormControl(null, Validators.required),
      desrutaLicencia: new FormControl(null),
    });
  }

  inicializarArchivos(ruta: any) {
    this.archivo = { ruta };
  }

  obtenerChoferPorId(id: any) {
    this.choferesService.buscarPorId(id).subscribe(
      (respuesta) => {
        if (respuesta && respuesta?.datos) {
          this.inicializarArchivos(respuesta?.datos.desrutaLicencia);
          this.editForm.patchValue({
            ...respuesta?.datos,
            fecInicioContrato: respuesta?.datos.fecInicioContrato && new Date(this.diferenciaUTC(respuesta?.datos.fecInicioContrato)),
            fecFinContrato: respuesta?.datos.fecFinContrato && new Date(this.diferenciaUTC(respuesta?.datos.fecFinContrato)),
            fecIniIncapacidad: respuesta?.datos.fecIniIncapacidad && new Date(this.diferenciaUTC(respuesta?.datos.fecIniIncapacidad)),
            fecFinIncapacidad: respuesta?.datos.fecFinIncapacidad && new Date(this.diferenciaUTC(respuesta?.datos.fecFinIncapacidad)),
            fecVigencia: respuesta?.datos.fecVigencia && new Date(this.diferenciaUTC(respuesta?.datos.fecVigencia)),
            fecExpedicion: respuesta?.datos.fecExpedicion && new Date(this.diferenciaUTC(respuesta?.datos.fecExpedicion)),
            estatusChofer: parseInt(respuesta?.datos.estatusChofer),
            desMotivo: parseInt(respuesta?.datos.desMotivo),
            idUnidadAdscripcion: parseInt(respuesta?.datos.idUnidadAdscripcion),
          });
          this.consultarDatosSIAP();
          this.cambioEstatus();
          this.cambioMotivo();
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  diferenciaUTC(fecha: string) {
    let objetoFecha = new Date(fecha);
    return objetoFecha.setMinutes(objetoFecha.getMinutes() + objetoFecha.getTimezoneOffset());
  }

  consultarDatosSIAP(): void {
    this.cargadorService.activar();
    let matricula = parseInt(this.editForm.get('cveMatriculaChofer')?.value);
    if (Number.isInteger(matricula)) {
      this.matriculaService.consultarMatriculaSIAP(this.editForm.get('cveMatriculaChofer')?.value).pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged()
      ).subscribe(
        (respuesta: any) => {
          if (
            respuesta &&
            respuesta.ConsultaMatriculaResult &&
            respuesta.ConsultaMatriculaResult?.NewDataSet
          ) {
            const { EMPLEADOS: objetoMatricula } = respuesta.ConsultaMatriculaResult?.NewDataSet;
            if (parseInt(objetoMatricula.CVEBAJA) === 0) {
              let nombreCompleto = objetoMatricula.NOMBRE.split('/');
              this.editForm.get('nombreChofer')?.setValue(`${nombreCompleto[2]} ${nombreCompleto[1]} ${nombreCompleto[0]}`);
              let idOoad = parseInt(objetoMatricula.DEL);
              this.obtenerNombreOoad(idOoad);
              this.obtenerUnidadesAdscripcion(idOoad);
              this.tipoContratacion = parseInt(objetoMatricula.CONTRATACION);
              this.validarTipoContratacion();
              // TO - DO En espera definicion para saber de dnd obtener Categoria
              // this.obtenerCategoria(idOoad);
              this.cargadorService.desactivar();
            } else {
              this.alertaService.mostrar("error", this.MATRICULA_DESACTIVADA);
              this.cargadorService.desactivar();
              this.limpiarCamposSIAP();
            }
          } else {
            this.alertaService.mostrar("error", this.MATRICULA_INEXISTENTE);
            this.cargadorService.desactivar();
            this.limpiarCamposSIAP();
          }
        }
      );
    }
    this.cargadorService.desactivar();
  }
  

  obtenerNombreOoad(idOoad: number) {
    this.cargadorService.activar();
    this.unidadService.buscarOoadPorId(0, 10, idOoad).subscribe(
      (respuesta) => {
        if (respuesta && respuesta?.datos.length > 0) {
          this.editForm.get('cveUnidadOOAD')?.setValue(respuesta?.datos[0].nomOoad);
        }
        this.cargadorService.desactivar();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.cargadorService.desactivar();
        this.alertaService.mostrar('error', error.message);
      }
    );
  }

  obtenerUnidadesAdscripcion(idOoad: number) {
    this.cargadorService.activar();
    this.unidadService.buscarAdscripcionPorOoad(0, 10, idOoad).subscribe(
      (respuesta) => {
        if (respuesta && respuesta?.datos?.content.length > 0) {
          respuesta?.datos.content.map((item: any) => {
            this.catAdscripciones.push({ value: item.idUnidad, label: item.nomUnidadAdscripcion });
          });
          this.cambioAdscripcion();
        }
        this.cargadorService.desactivar();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.cargadorService.desactivar();
        this.alertaService.mostrar('error', error.message);
      }
    );
  }


  editar() {
    this.editForm.get('desrutaLicencia')?.patchValue(this.archivo?.archivo?.name);
    const data = this.editForm.getRawValue();
    
    if (this.editForm.valid) {
      let chofer: any = {
        ...data,
        desMotivo: String(this.editForm.get('desMotivo')?.value),
        fecInicioContrato: this.editForm.get('fecInicioContrato')?.value &&
          moment(this.editForm.get('fecInicioContrato')?.value).format('YYYY-MM-DD'),
        fecFinContrato: this.editForm.get('fecFinContrato')?.value &&
          moment(this.editForm.get('fecFinContrato')?.value).format('YYYY-MM-DD'),
        fecVigencia: this.editForm.get('fecVigencia')?.value &&
          moment(this.editForm.get('fecVigencia')?.value).format('YYYY-MM-DD'),
        fecExpedicion: this.editForm.get('fecExpedicion')?.value &&
          moment(this.editForm.get('fecExpedicion')?.value).format('YYYY-MM-DD'),
        fecIniIncapacidad: this.editForm.get('fecIniIncapacidad')?.value &&
          moment(this.editForm.get('fecIniIncapacidad')?.value).format('YYYY-MM-DD'),
        fecFinIncapacidad: this.editForm.get('fecFinIncapacidad')?.value &&
          moment(this.editForm.get('fecFinIncapacidad')?.value).format('YYYY-MM-DD'),
      };      

      this.archivoService.obtenerArchivosDeCustomFiles(this.archivo).pipe(
          switchMap((archivosRespuesta: File[]) => {
            let archivos = {
              archivo: archivosRespuesta[0],
            };

            chofer = {
              ...chofer,
              archivo: archivos?.archivo,
            }
            
            return this.choferesService.actualizarChofer(chofer)
          })
        ).subscribe(
          (respuesta: any) => {
            this.alertaService.mostrar("exito", this.ACTUALIZAR_CHOFER);
            this.cargadorService.desactivar();
            this.router.navigate(["../.."], { relativeTo: this.route });
          },
          (error: HttpErrorResponse) => {
            console.error(error);
            this.cargadorService.desactivar();
          }
        );
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  validarCamposSIAP(data: any): boolean {
    if (data.nombreChofer &&
      data.cveUnidadOOAD &&
      data.idUnidadAdscripcion &&
      data.desCategoria) {
      return true;
    }
    return false;
  }

  validarTipoContratacion() {
    if (this.tipoContratacion === this.ID_CONTRATACION_SUSTITUTO) {
      this.editForm.get('fecInicioContrato')?.reset();
      this.editForm.get('fecInicioContrato')?.setValidators(Validators.required);

      this.editForm.get('fecFinContrato')?.reset();
      this.editForm.get('fecFinContrato')?.setValidators(Validators.required);
    } else {
      this.editForm.get('fecInicioContrato')?.clearValidators();
      this.editForm.get('fecFinContrato')?.clearValidators();
    }
    this.editForm.get('fecInicioContrato')?.updateValueAndValidity();
    this.editForm.get('fecFinContrato')?.updateValueAndValidity();
  }

  limpiarCamposSIAP() {
    this.editForm.get('nombreChofer')?.patchValue(null);
    this.editForm.get('cveUnidadAdscripcion')?.patchValue(null);
    this.editForm.get('idUnidadAdscripcion')?.patchValue(null);
    this.editForm.get('cveUnidadOOAD')?.patchValue(null);
    this.editForm.get('desCategoria')?.patchValue(null);
  }

  cambioEstatus() {
    this.desMotivoHasValidator = true;
    this.catMotivo = [];
    this.editForm.get('desMotivo')?.setValidators(Validators.required);
    if (this.editForm.get('estatusChofer')?.value === this.ID_ESTATUS_BAJA) {
      this.catMotivo = CATALOGO_ESTATUS_CHOFER_BAJA;
    } else if (this.editForm.get('estatusChofer')?.value === this.ID_ESTATUS_BLOQUEADO) {
      this.catMotivo = CATALOGO_ESTATUS_CHOFER_BLOQUEADO;
    } else {
      this.editForm.get('desMotivo')?.reset();
      this.editForm.get('desMotivo')?.clearValidators();
      this.desMotivoHasValidator = false;
    }
    this.editForm.get('desMotivo')?.updateValueAndValidity();
  }

  cambioMotivo() {
    if (this.editForm.get('desMotivo')?.value === this.ID_ESTATUS_INCAPACIDAD) {
      this.editForm.get('fecIniIncapacidad')?.setValidators(Validators.required);
      this.editForm.get('fecFinIncapacidad')?.setValidators(Validators.required);
    } else {
      this.editForm.get('fecIniIncapacidad')?.reset();
      this.editForm.get('fecIniIncapacidad')?.clearValidators();

      this.editForm.get('fecFinIncapacidad')?.reset();
      this.editForm.get('fecFinIncapacidad')?.clearValidators();
    }
    this.editForm.get('fecIniIncapacidad')?.updateValueAndValidity();
    this.editForm.get('fecFinIncapacidad')?.updateValueAndValidity();
  }

  cambioAdscripcion() {
    if (this.editForm.get('idUnidadAdscripcion')?.value) {
      const adscripcionSeleccionada = this.catAdscripciones.find((item: any) => item.value === this.editForm.get('idUnidadAdscripcion')?.value);
      this.editForm.get('cveUnidadAdscripcion')?.setValue(adscripcionSeleccionada.label);
      this.editForm.get('desCategoria')?.setValue(adscripcionSeleccionada.label);
      this.editForm.get('idUnidadAdscripcion')?.setValue(adscripcionSeleccionada.value);
    }
  }

  validarArchivo(event: any) {
    console.log(event);
  }

  get f() {
    return this.editForm.controls;
  }

}
