import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { MatriculaService } from 'src/app/servicios/matricula.service';
import {
  CATALOGO_ESTATUS_CHOFER,
  CATALOGO_ESTATUS_CHOFER_BAJA,
  CATALOGO_ESTATUS_CHOFER_BLOQUEADO
} from 'src/app/utilerias/catalogos';
import { ChoferesService } from '../../servicios/choferes.service';

@Component({
  selector: 'app-alta-choferes',
  templateUrl: './alta-choferes.component.html',
  styleUrls: ['./alta-choferes.component.scss'],
  providers: [
    DatePipe
  ]
})
export class AltaChoferesComponent implements OnInit {

  readonly ALTA_CHOFER = "El chofer ha sido dado de alta exitosamente.";
  readonly MATRICULA_DESACTIVADA = "La matrícula ingresada no está vigente.";
  readonly MATRICULA_INEXISTENTE = "La matrícula ingresada no existe.";
  public archivo!: CustomFile;
  public editForm!: FormGroup;
  public catEstatus: any[] = CATALOGO_ESTATUS_CHOFER;
  public catMotivo: any[] = [];
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
    private matriculaService: MatriculaService
  ) { }

  ngOnInit(): void {
    // let matricula: string = '';
    // this.aut.usuario$.subscribe((value: Usuario | null) => {
    //   matricula = value?.matricula || ''
    // });
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.editForm = this.fb.group({
      idChofer: new FormControl(''),
      nombreChofer: new FormControl({ value: '', disabled: true }),
      cveUnidadAdscripcion: new FormControl({ value: '', disabled: true }),
      idUnidadAdscripcion: new FormControl({ value: '', disabled: true }),
      cveUnidadOOAD: new FormControl({ value: '', disabled: true }),
      desCategoria: new FormControl({ value: '', disabled: true }),
      cveMatriculaChofer: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(12)])),
      cveMatricula: new FormControl("", Validators.required),
      fecInicioContrato: new FormControl(null, Validators.required),
      fecFinContrato: new FormControl(null, Validators.required),
      fecIniIncapacidad: new FormControl(''),
      fecFinIncapacidad: new FormControl(''),
      estatusChofer: new FormControl(null, Validators.required),
      desMotivo: new FormControl(null, Validators.required),
      cveLicencia: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(10)])),
      cveTipoLicencia: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
      fecVigencia: new FormControl(null, Validators.required),
      fecExpedicion: new FormControl(null, Validators.required),
      desrutaLicencia: new FormControl(null, Validators.required),
    });
  }

  consultarDatosSIAP(): void {
    this.cargadorService.activar();
    console.log("ENTRAMOS");
    if (this.editForm.get('cveMatriculaChofer')?.value) {
      this.matriculaService.consultarMatriculaSIAP(this.editForm.get('cveMatriculaChofer')?.value).pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged()
      ).subscribe(
        (respuesta: any) => {
          if(respuesta.datos) {
            if (respuesta.datos.status === 1) {
              this.editForm.get('nombreChofer')?.setValue(respuesta.datos.nombre);
              this.editForm.get('cveUnidadOOAD')?.setValue(respuesta.datos.descPuesto);
              this.editForm.get('desCategoria')?.setValue(respuesta.datos.descDepto);
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

  guardar() {
    this.editForm.get('desrutaLicencia')?.patchValue(this.archivo?.archivo?.name);
    if (this.editForm.valid) {
      let chofer: any = {
        ...this.editForm.value,
        fecInicioContrato: moment(this.editForm.get('fecInicioContrato')?.value).format('YYYY-MM-DD'),
        fecFinContrato: moment(this.editForm.get('fecFinContrato')?.value).format('YYYY-MM-DD'),
        fecVigencia: moment(this.editForm.get('fecVigencia')?.value).format('YYYY-MM-DD'),
        fecExpedicion: moment(this.editForm.get('fecExpedicion')?.value).format('YYYY-MM-DD'),
        fecIniIncapacidad: this.editForm.get('fecIniIncapacidad')?.value && moment(this.editForm.get('fecIniIncapacidad')?.value).format('YYYY-MM-DD'),
        fecFinIncapacidad: this.editForm.get('fecFinIncapacidad')?.value && moment(this.editForm.get('fecFinIncapacidad')?.value).format('YYYY-MM-DD'),
        archivo: this.archivo?.archivo
      };

      this.choferesService.guardar(chofer).subscribe(
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
    if (this.editForm.get('estatusChofer')?.value === 1) {
      this.catMotivo = CATALOGO_ESTATUS_CHOFER_BAJA;
    } else if (this.editForm.get('estatusChofer')?.value === 3) {
      this.catMotivo = CATALOGO_ESTATUS_CHOFER_BLOQUEADO;
    }
  }

  cambioMotivo() {
    if (this.editForm.get('desMotivo')?.value === 9) {
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

  get f() {
    return this.editForm.controls;
  }

}
