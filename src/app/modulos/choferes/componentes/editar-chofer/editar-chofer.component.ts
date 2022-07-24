import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { ChoferesService } from '../../servicios/choferes.service';

@Component({
  selector: 'app-editar-chofer',
  templateUrl: './editar-chofer.component.html',
  styleUrls: ['./editar-chofer.component.scss']
})
export class EditarChoferComponent implements OnInit {

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
  readonly ACTUALIZAR_CHOFER = "El registro se ha actualizado exitosamente.";
  public editForm!: FormGroup;
  public archivo!: CustomFile;

  constructor(
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private choferesService: ChoferesService,
    private alertaService: AlertasFlotantesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    const idChofer = String(this.rutaActiva.snapshot.paramMap.get('idChofer'));
    if (idChofer) {
      this.obtenerChoferPorId(idChofer);
    }
  }

  inicializarFormulario() {
    this.editForm = this.fb.group({
      idChofer: [null],
      matriculaChofer: [null, Validators.compose([Validators.required])],
      // matricula: [null, Validators.compose([Validators.required])],
      nombreChofer: [null],
      unidadAdscripcion: [null],
      idUnidadAdscripcion: [null],
      unidadOoad: [null],
      fecInicioContrato: [null, Validators.compose([Validators.required])],
      fecFinContrato: [null, Validators.compose([Validators.required])],
      // fecIniIncapacidad: [null, Validators.compose([Validators.required])],
      // fecFinIncapacidad: [null, Validators.compose([Validators.required])],
      categoria: [null, Validators.compose([Validators.required])],
      estatusChofer: [null, Validators.compose([Validators.required])],
      motivo: [null, Validators.compose([Validators.required])],
      licencia: [null, Validators.compose([Validators.required])],
      tipoLicencia: [null, Validators.compose([Validators.required])],
      fecVigencia: [null, Validators.compose([Validators.required])],
      fecExpedicion: [null, Validators.compose([Validators.required])],
      desrutaLicencia: [null, Validators.compose([Validators.required])],
    });
  }

  editar() {
    this.editForm.get('desrutaLicencia')?.patchValue(this.archivo?.archivo?.name);
    if (this.editForm.valid) {
      let chofer: any = {
        ...this.editForm.value,
      }
      console.log(chofer);
      this.choferesService.actualizar(chofer.idChofer, chofer).subscribe(
        (respuesta) => {
          this.alertaService.mostrar("exito", this.ACTUALIZAR_CHOFER);
          this.router.navigate(["../"], { relativeTo: this.route });
        },
        (error: HttpErrorResponse) => {
          console.error("ERROR: ", error)
        }
      );
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  obtenerChoferPorId(id: any) {
    this.choferesService.buscarPorId(id).subscribe(
      (respuesta) => {
        this.editForm.patchValue({
          ...this.editForm.value,
          ...respuesta?.datos,
        });
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

}
