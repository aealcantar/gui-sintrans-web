import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
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
import { Chofer } from 'src/app/modelos/chofer.interface';

@Component({
  selector: 'app-alta-choferes',
  templateUrl: './alta-choferes.component.html',
  styleUrls: ['./alta-choferes.component.scss'],
  providers: [
    DatePipe
  ]
})
export class AltaChoferesComponent implements OnInit {
  readonly ALTA_CHOFER = "Nuevo registro se dió de alta exitosamente.";
  public archivo!: CustomFile;
  public editForm!: FormGroup;
  public catEstatus: any[] = CATALOGO_ESTATUS_CHOFER;
  public catMotivo: any[] = [];
  public desMotivoHasValidator: boolean = false;
  // public chofer!: Chofer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private choferesService: ChoferesService,
    private aut: AutenticacionService,
    private matriculaService: MatriculaService
  ) { }

  ngOnInit(): void {
    let matricula: string = '';
    this.aut.usuario$.subscribe((value: Usuario | null) => {
      matricula = value?.matricula || ''
    });
    this.inicializarFormulario(matricula);
  }

  inicializarFormulario(matricula: string) {
    this.editForm = this.fb.group({
      nombreChofer: [{ value: 'NOMBRE_CHOFER_SIAP', disabled: true }],
      unidadAdscripcion: [{ value: 'CONTRATACIÓN 08', disabled: true }],
      idUnidadAdscripcion: [{ value: 1, disabled: true }],
      unidadOoad: [{ value: 'OOAD_SIAP', disabled: true }],
      categoria: [{ value: 'CATEGORIA_SIAP', disabled: true }],
      matriculaChofer: [null, Validators.compose(
        [Validators.required, Validators.maxLength(12)]
      )],
      matricula: [matricula, Validators.required],
      fecInicioContrato: [null],
      fecFinContrato: [null],
      fecIniIncapacidad: [null],
      fecFinIncapacidad: [null],
      estatusChofer: [null, Validators.required],
      motivo: [null, Validators.required],
      licencia: [null, Validators.compose([Validators.required, Validators.maxLength(10)])],
      tipoLicencia: [null, Validators.compose([Validators.required, Validators.maxLength(15)])],
      fecVigencia: [null, Validators.required],
      fecExpedicion: [null, Validators.required],
      desrutaLicencia: [null, Validators.required],
    });
  }

  guardar() {
    this.editForm.get('desrutaLicencia')?.patchValue(this.archivo?.archivo?.name);
    const data = this.editForm.getRawValue();
    
    if (this.editForm.valid) {
      let chofer: Chofer = {
        ...data,
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

      console.log(chofer);

      this.choferesService.guardarChofer(chofer, this.archivo?.archivo).subscribe(
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
      this.editForm.markAllAsTouched();
    }
  }

  cambioEstatus() {
    this.desMotivoHasValidator = true;
    this.catMotivo = [];
    this.editForm.get('motivo')?.setValidators(Validators.required);
    if (this.editForm.get('estatusChofer')?.value === 1) {
      this.catMotivo = CATALOGO_ESTATUS_CHOFER_BAJA;
    } else if (this.editForm.get('estatusChofer')?.value === 3) {
      this.catMotivo = CATALOGO_ESTATUS_CHOFER_BLOQUEADO;
    } else {
      this.editForm.get('motivo')?.reset();
      this.editForm.get('motivo')?.clearValidators();
      this.desMotivoHasValidator = false;
    }
    this.editForm.get('motivo')?.updateValueAndValidity();
  }

  cambioMotivo() {
    if (this.editForm.get('motivo')?.value === 9) {
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
    if (this.editForm.get('unidadAdscripcion')?.value === 'CONTRATACIÓN 08') {
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

  validarMatricula() {
    if (this.editForm.get('matriculaChofer')?.value.length >= 8) {
      this.validarEstatusSIAP();
    }
  }

  async validarEstatusSIAP(): Promise<boolean> {
    let respuesta = await this.matriculaService.consultarMatriculaSIAP(
      this.editForm.get('matriculaChofer')?.value
    ).pipe(first()).toPromise();
    let informacionSIAP = respuesta.datos;
    return informacionSIAP.status === 1;
  }

  get f() {
    return this.editForm.controls;
  }

}
