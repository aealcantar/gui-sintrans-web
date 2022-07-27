import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { ArchivoService } from 'src/app/servicios/archivo-service';
import { MatriculaService } from 'src/app/servicios/matricula.service';
import { AutenticacionService } from 'src/app/servicios/seguridad/autenticacion.service';
import {
  CATALOGO_ESTATUS_CHOFER,
  CATALOGO_ESTATUS_CHOFER_BAJA,
  CATALOGO_ESTATUS_CHOFER_BLOQUEADO
} from 'src/app/utilerias/catalogos';
import { ChoferesService } from '../../servicios/choferes.service';

@Component({
  selector: 'app-editar-chofer',
  templateUrl: './editar-chofer.component.html',
  styleUrls: ['./editar-chofer.component.scss']
})
export class EditarChoferComponent implements OnInit {

  readonly ACTUALIZAR_CHOFER = "El registro se ha actualizado exitosamente.";
  readonly MATRICULA_DESACTIVADA = "La matrícula ingresada no está vigente.";
  readonly MATRICULA_INEXISTENTE = "La matrícula ingresada no existe.";
  public archivo!: CustomFile;
  public form!: FormGroup;
  public catEstatus: any[] = CATALOGO_ESTATUS_CHOFER;
  public catMotivo: any[] = [];
  public desMotivoHasValidator: boolean = false;

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
    private archivoService: ArchivoService,
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
    this.form = this.fb.group({
      idChofer: new FormControl(null),
      nombreChofer: new FormControl({ value: '', disabled: true }),
      cveUnidadAdscripcion: new FormControl({ value: '', disabled: true }),
      idUnidadAdscripcion: new FormControl({ value: null, disabled: true }),
      cveUnidadOOAD: new FormControl({ value: '', disabled: true }),
      desCategoria: new FormControl({ value: '', disabled: true }),
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
          this.form.patchValue({
            ...respuesta?.datos,
            fecInicioContrato: respuesta?.datos.fecInicioContrato && new Date(this.diferenciaUTC(respuesta?.datos.fecInicioContrato)),
            fecFinContrato: respuesta?.datos.fecFinContrato && new Date(this.diferenciaUTC(respuesta?.datos.fecFinContrato)),
            fecIniIncapacidad: respuesta?.datos.fecIniIncapacidad && new Date(this.diferenciaUTC(respuesta?.datos.fecIniIncapacidad)),
            fecFinIncapacidad: respuesta?.datos.fecFinIncapacidad && new Date(this.diferenciaUTC(respuesta?.datos.fecFinIncapacidad)),
            fecVigencia: respuesta?.datos.fecVigencia && new Date(this.diferenciaUTC(respuesta?.datos.fecVigencia)),
            fecExpedicion: respuesta?.datos.fecExpedicion && new Date(this.diferenciaUTC(respuesta?.datos.fecExpedicion)),
            estatusChofer: parseInt(respuesta?.datos.estatusChofer),
            desMotivo: parseInt(respuesta?.datos.desMotivo),
          });
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
    if (this.form.get('cveMatriculaChofer')?.value) {
      this.matriculaService.consultarMatriculaSIAP(this.form.get('cveMatriculaChofer')?.value).pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged()
      ).subscribe(
        (respuesta: any) => {
          if (respuesta.datos) {
            if (respuesta.datos.status === 1) {
              this.form.get('nombreChofer')?.setValue(respuesta.datos.nombre);
              this.form.get('cveUnidadAdscripcion')?.setValue(respuesta.datos.descPuesto);
              this.form.get('idUnidadAdscripcion')?.setValue(6);
              this.form.get('cveUnidadOOAD')?.setValue(respuesta.datos.descPuesto);
              this.form.get('desCategoria')?.setValue(respuesta.datos.descDepto);
              this.cargadorService.desactivar();
            } else {
              this.alertaService.mostrar("error", this.MATRICULA_DESACTIVADA);
              this.cargadorService.desactivar();
            }
          } else {
            this.alertaService.mostrar("error", this.MATRICULA_INEXISTENTE);
            this.cargadorService.desactivar();
          }
        }
      );
    }
    this.cargadorService.desactivar();
  }

  editar() {
    this.cargadorService.activar();
    this.form.get('desrutaLicencia')?.patchValue(this.archivo?.archivo?.name);
    const data = this.form.getRawValue();
    let chofer: any = {
      ...data,
      desMotivo: String(this.form.get('desMotivo')?.value),
      fecInicioContrato: this.form.get('fecInicioContrato')?.value &&
        moment(this.form.get('fecInicioContrato')?.value).format('YYYY-MM-DD'),
      fecFinContrato: this.form.get('fecFinContrato')?.value &&
        moment(this.form.get('fecFinContrato')?.value).format('YYYY-MM-DD'),
      fecVigencia: this.form.get('fecVigencia')?.value &&
        moment(this.form.get('fecVigencia')?.value).format('YYYY-MM-DD'),
      fecExpedicion: this.form.get('fecExpedicion')?.value &&
        moment(this.form.get('fecExpedicion')?.value).format('YYYY-MM-DD'),
      fecIniIncapacidad: this.form.get('fecIniIncapacidad')?.value &&
        moment(this.form.get('fecIniIncapacidad')?.value).format('YYYY-MM-DD'),
      fecFinIncapacidad: this.form.get('fecFinIncapacidad')?.value &&
        moment(this.form.get('fecFinIncapacidad')?.value).format('YYYY-MM-DD'),
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
  }

  cambioEstatus() {
    this.desMotivoHasValidator = true;
    this.catMotivo = [];
    this.form.get('desMotivo')?.setValidators(Validators.required);
    if (this.form.get('estatusChofer')?.value === 1) {
      this.catMotivo = CATALOGO_ESTATUS_CHOFER_BAJA;
    } else if (this.form.get('estatusChofer')?.value === 2) {
      this.catMotivo = CATALOGO_ESTATUS_CHOFER_BLOQUEADO;
    } else {
      this.form.get('desMotivo')?.reset();
      this.form.get('desMotivo')?.clearValidators();
      this.desMotivoHasValidator = false;
    }
    this.form.get('desMotivo')?.updateValueAndValidity();
  }

  cambioMotivo() {
    if (this.form.get('desMotivo')?.value === 9) {
      this.form.get('fecIniIncapacidad')?.setValidators(Validators.required);
      this.form.get('fecFinIncapacidad')?.setValidators(Validators.required);
    } else {
      this.form.get('fecIniIncapacidad')?.reset();
      this.form.get('fecIniIncapacidad')?.clearValidators();

      this.form.get('fecFinIncapacidad')?.reset();
      this.form.get('fecFinIncapacidad')?.clearValidators();
    }
    this.form.get('fecIniIncapacidad')?.updateValueAndValidity();
    this.form.get('fecFinIncapacidad')?.updateValueAndValidity();
  }

  cambioAdscripcion() {
    if (this.form.get('cveUnidadAdscripcion')?.value === 'CONTRATACIÓN 08') {
      this.form.get('fecInicioContrato')?.reset();
      this.form.get('fecInicioContrato')?.setValidators(Validators.required);

      this.form.get('fecFinContrato')?.reset();
      this.form.get('fecFinContrato')?.setValidators(Validators.required);
    } else {
      this.form.get('fecInicioContrato')?.clearValidators();
      this.form.get('fecFinContrato')?.clearValidators();
    }
    this.form.get('fecInicioContrato')?.updateValueAndValidity();
    this.form.get('fecFinContrato')?.updateValueAndValidity();
  }

  validarArchivo(event: any) {
    console.log(event);
  }

  get f() {
    return this.form.controls;
  }

  get estaArchivoCargado(): boolean {
    let archivosCargados: boolean = false;
    if (this.archivo) {
      archivosCargados = true;
    }
    return archivosCargados;
  }

}
