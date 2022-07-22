import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { Chofer } from 'src/app/modelos/chofer.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
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
  public archivos: any[] = [];
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
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.editForm = this.fb.group({
      idChofer: [null],
      cveMatriculaChofer: [null, Validators.compose([Validators.required])],
      // cveMatricula: [null, Validators.compose([Validators.required])],
      nombreChofer: [null],
      cveUnidadAdscripcion: [null],
      idUnidadAdscripcion: [null],
      cveUnidadOOAD: [null],
      fecInicioContrato: [null, Validators.compose([Validators.required])],
      fecFinContrato: [null, Validators.compose([Validators.required])],
      // fecIniIncapacidad: [null, Validators.compose([Validators.required])],
      // fecFinIncapacidad: [null, Validators.compose([Validators.required])],
      desCategoria: [null, Validators.compose([Validators.required])],
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
    this.editForm.get('desrutaLicencia')?.patchValue(this.archivos[0]?.name);
    console.log(this.editForm.value);

    if (this.editForm.valid) {
      let chofer: any = {
        ...this.editForm.value,
      }
      console.log(chofer);
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
