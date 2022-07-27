import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { MatriculaService } from 'src/app/servicios/matricula.service';
import { AutenticacionService } from 'src/app/servicios/seguridad/autenticacion.service';
import {
  CATALOGO_ESTATUS_CHOFER,
  CATALOGO_ESTATUS_CHOFER_BAJA,
  CATALOGO_ESTATUS_CHOFER_BLOQUEADO
} from 'src/app/utilerias/catalogos';
import { ChoferesService } from '../../servicios/choferes.service';

@Component({
  selector: 'app-alta-choferes',
  templateUrl: './alta-choferes.component.html',
  styleUrls: ['./alta-choferes.component.scss']
})
export class AltaChoferesComponent implements OnInit {

  readonly ALTA_CHOFER = "El chofer ha sido dado de alta exitosamente.";
  readonly MATRICULA_DESACTIVADA = "La matrícula ingresada no está vigente.";
  readonly MATRICULA_INEXISTENTE = "La matrícula ingresada no existe.";
  public archivo!: CustomFile;
  public form!: FormGroup;
  public catEstatus: any[] = CATALOGO_ESTATUS_CHOFER;
  public catMotivo: any[] = [];
  public desMotivoHasValidator: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService,
    private fb: FormBuilder,
    private choferesService: ChoferesService,
    private matriculaService: MatriculaService,
    private aut: AutenticacionService,
  ) { }

  ngOnInit(): void {
    let matricula: string = '';
    this.aut.usuario$.subscribe((value: Usuario | null) => {
      matricula = value?.matricula || ''
    });
    this.inicializarFormulario(matricula);
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
      fecExpedicion: new FormControl(null, Validators.required)
    });
  }

  validarArchivo(event: any) {
    console.log(event);
  }

  consultarDatosSIAP(inputMatricula: any): void {
    this.cargadorService.activar();
    if (inputMatricula) {
      this.matriculaService.consultarMatriculaSIAP(inputMatricula).subscribe(
        (respuesta: any) => {
          if (respuesta.datos) {
            if (respuesta.datos.status === 1) {
              this.form.get('nombreChofer')?.setValue(respuesta.datos.nombre);
              this.form.get('desCategoria')?.setValue(respuesta.datos.descPuesto);
              this.form.get('idUnidadAdscripcion')?.setValue(6);
              this.form.get('cveUnidadOOAD')?.setValue(respuesta.datos.descPuesto);
              this.form.get('cveUnidadAdscripcion')?.setValue(respuesta.datos.descDepto);
              this.cargadorService.desactivar();
            } else {
              this.alertaService.mostrar("error", this.MATRICULA_DESACTIVADA);
              this.cargadorService.desactivar();
            }
          } else {
            this.alertaService.mostrar("info", this.MATRICULA_INEXISTENTE);
            this.cargadorService.desactivar();
          }
        }
      );
    }
    this.cargadorService.desactivar();
  }

  guardar() {
    this.form.get('desrutaLicencia')?.patchValue(this.archivo?.archivo?.name);
    const data = this.form.getRawValue();

    if (this.form.valid) {
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
        archivo: this.archivo?.archivo,
      };

      this.choferesService.guardarChofer(chofer).subscribe(
        (respuesta) => {
          this.alertaService.mostrar("exito", this.ALTA_CHOFER);
          this.cargadorService.desactivar();
          this.router.navigate(["../"], { relativeTo: this.route });
        },
        (error: HttpErrorResponse) => {
          this.cargadorService.desactivar();
          console.error("ERROR: ", error)
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
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
