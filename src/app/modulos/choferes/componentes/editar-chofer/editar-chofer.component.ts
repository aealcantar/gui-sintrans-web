import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { ChoferesService } from '../../servicios/choferes.service';
import { AutenticacionService } from 'src/app/servicios/seguridad/autenticacion.service';
import {
  CATALOGO_ESTATUS_CHOFER,
  CATALOGO_ESTATUS_CHOFER_BAJA,
  CATALOGO_ESTATUS_CHOFER_BLOQUEADO
} from 'src/app/utilerias/catalogos';
import { Chofer } from 'src/app/modelos/chofer.interface';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { MatriculaService } from 'src/app/servicios/matricula.service';
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
  public archivo!: CustomFile;
  public editForm!: FormGroup;
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
    private datePipe: DatePipe,
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
      idChofer: new FormControl(null),
      nombreChofer: new FormControl({ value: '', disabled: true }),
      unidadAdscripcion: new FormControl({ value: '', disabled: true }),
      idUnidadAdscripcion: new FormControl({ value: '', disabled: true }),
      unidadOoad: new FormControl({ value: '', disabled: true }),
      categoria: new FormControl({ value: '', disabled: true }),
      matriculaChofer: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(12)])),
      matricula: new FormControl(matricula, Validators.required),
      fecInicioContrato: new FormControl(null),
      fecFinContrato: new FormControl(null),
      fecIniIncapacidad: new FormControl(null),
      fecFinIncapacidad: new FormControl(null),
      estatusChofer: new FormControl(null, Validators.required),
      motivo: new FormControl(null),
      licencia: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(10)])),
      tipoLicencia: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
      fecVigencia: new FormControl(null, Validators.required),
      fecExpedicion: new FormControl(null, Validators.required),
      desrutaLicencia: new FormControl(null, Validators.required),
    });
  }

  obtenerChoferPorId(id: any) {
    this.choferesService.buscarPorId(id).subscribe(
      (respuesta) => {
        if (respuesta && respuesta?.datos) {
          this.editForm.patchValue({
            ...respuesta?.datos,
            fecInicioContrato: respuesta?.datos.fecInicioContrato &&
              this.datePipe.transform(respuesta?.datos.fecAlta, 'dd/MM/YYYY'),
            fecFinContrato: respuesta?.datos.fecFinContrato &&
              this.datePipe.transform(respuesta?.datos.fecAlta, 'dd/MM/YYYY'),
            fecIniIncapacidad: respuesta?.datos.fecIniIncapacidad &&
              this.datePipe.transform(respuesta?.datos.fecAlta, 'dd/MM/YYYY'),
            fecFinIncapacidad: respuesta?.datos.fecFinIncapacidad &&
              this.datePipe.transform(respuesta?.datos.fecAlta, 'dd/MM/YYYY'),
            fecVigencia: respuesta?.datos.fecVigencia &&
              this.datePipe.transform(respuesta?.datos.fecAlta, 'dd/MM/YYYY'),
            fecExpedicion: respuesta?.datos.fecExpedicion &&
              this.datePipe.transform(respuesta?.datos.fecAlta, 'dd/MM/YYYY'),
            estatusChofer: parseInt(respuesta?.datos.estatusChofer),
            motivo: parseInt(respuesta?.datos.motivo),
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

  consultarDatosSIAP(): void {
    this.cargadorService.activar();
    console.log("ENTRAMOS");
    if (this.editForm.get('matriculaChofer')?.value) {
      this.matriculaService.consultarMatriculaSIAP(this.editForm.get('matriculaChofer')?.value).pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged()
      ).subscribe(
        (respuesta: any) => {
          if (respuesta.datos) {
            if (respuesta.datos.status === 1) {
              this.editForm.get('nombreChofer')?.setValue(respuesta.datos.nombre);
              this.editForm.get('unidadAdscripcion')?.setValue(respuesta.datos.descPuesto);
              this.editForm.get('unidadOoad')?.setValue(respuesta.datos.descPuesto);
              this.editForm.get('categoria')?.setValue(respuesta.datos.descDepto);
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
    this.editForm.get('desrutaLicencia')?.patchValue(this.archivo?.archivo?.name);
    const data = this.editForm.getRawValue();

    if (this.editForm.valid) {
      let chofer: Chofer = {
        ...data,
        motivo: String(this.editForm.get('motivo')?.value),
        fecInicioContrato: this.editForm.get('fecInicioContrato')?.value &&
          moment(this.editForm.get('fecInicioContrato')?.value).format('YYYY/MM/DD'),
        fecFinContrato: this.editForm.get('fecFinContrato')?.value &&
          moment(this.editForm.get('fecFinContrato')?.value).format('YYYY/MM/DD'),
        fecVigencia: this.editForm.get('fecVigencia')?.value &&
          moment(this.editForm.get('fecVigencia')?.value).format('YYYY/MM/DD'),
        fecExpedicion: this.editForm.get('fecExpedicion')?.value &&
          moment(this.editForm.get('fecExpedicion')?.value).format('YYYY/MM/DD'),
        fecIniIncapacidad: this.editForm.get('fecIniIncapacidad')?.value &&
          moment(this.editForm.get('fecIniIncapacidad')?.value).format('YYYY/MM/DD'),
        fecFinIncapacidad: this.editForm.get('fecFinIncapacidad')?.value &&
          moment(this.editForm.get('fecFinIncapacidad')?.value).format('YYYY/MM/DD'),
      };

      console.log(chofer);

      this.choferesService.actualizarChofer(chofer.idChofer, chofer, this.archivo?.archivo).subscribe(
        (respuesta) => {
          this.alertaService.mostrar("exito", this.ACTUALIZAR_CHOFER);
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
    } else if (this.editForm.get('estatusChofer')?.value === 2) {
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

  get f() {
    return this.editForm.controls;
  }

}
