import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { Chofer } from 'src/app/modelos/chofer.interface';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { AutenticacionService } from 'src/app/servicios/seguridad/autenticacion.service';
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
  ooad: any = [
    {
      label: 'Valor 1', value: 1
    },
    {
      label: 'Valor 2', value: 2
    },
    {
      label: 'Valor 3', value: 3
    }
  ];
  readonly ALTA_CHOFER = "Nuevo registro se dió de alta exitosamente.";
  public archivos: CustomFile[] = [];
  public editForm!: FormGroup;
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
      idChofer: [''],
      nombreChofer: [{ value: 'NOMBRE_CHOFER_SIAP', disabled: true }],
      cveUnidadAdscripcion: [{ value: 'CVE_ADSCRIPCION_SIAP', disabled: true }],
      idUnidadAdscripcion: [{ value: 'ID_ADSCRIPCION_SIAP', disabled: true }],
      cveUnidadOOAD: [{ value: 'OOAD_SIAP', disabled: true }],
      desCategoria: [{ value: 'CATEGORIA_SIAP', disabled: true }],
      cveMatriculaChofer: [null, Validators.compose([Validators.required, Validators.maxLength(12)])],
      cveMatricula: [matricula, Validators.required],
      fecInicioContrato: [null, Validators.compose([Validators.required])],
      fecFinContrato: [null, Validators.compose([Validators.required])],
      fecIniIncapacidad: [''],
      fecFinIncapacidad: [''],
      estatusChofer: [null, Validators.compose([Validators.required])],
      desMotivo: [null, Validators.compose([Validators.required])],
      cveLicencia: [null, Validators.compose([Validators.required])],
      cveTipoLicencia: [null, Validators.compose([Validators.required])],
      fecVigencia: [null, Validators.compose([Validators.required])],
      fecExpedicion: [null, Validators.compose([Validators.required])],
      desrutaLicencia: [null, Validators.compose([Validators.required])],
    });
  }

  guardar() {
    this.editForm.get('desrutaLicencia')?.patchValue(this.archivos[0]?.archivo?.name);
    console.log(this.editForm.value);

    if (this.editForm.valid) {
      let chofer: any = {
        ...this.editForm.value,
        fecInicioContrato: moment(this.editForm.get('fecInicioContrato')?.value).format('YYYY-MM-DD'),
        fecFinContrato: moment(this.editForm.get('fecFinContrato')?.value).format('YYYY-MM-DD'),
        fecVigencia: moment(this.editForm.get('fecVigencia')?.value).format('YYYY-MM-DD'),
        fecExpedicion: moment(this.editForm.get('fecExpedicion')?.value).format('YYYY-MM-DD'),
        fecIniIncapacidad: this.editForm.get('fecIniIncapacidad')?.value && moment(this.editForm.get('fecIniIncapacidad')?.value).format('YYYY-MM-DD'),
        fecFinIncapacidad: this.editForm.get('fecFinIncapacidad')?.value && moment(this.editForm.get('fecFinIncapacidad')?.value).format('YYYY-MM-DD'),
        archivo: this.archivos[0]?.archivo,
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

  // get f() {
  //   return this.form.controls;
  // }

}
