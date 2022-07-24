import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { Chofer } from 'src/app/modelos/chofer.interface';
import { ChoferesService } from '../../servicios/choferes.service';

@Component({
  selector: 'app-detalle-chofer',
  templateUrl: './detalle-chofer.component.html',
  styleUrls: ['./detalle-chofer.component.scss']
})
export class DetalleChoferComponent implements OnInit {

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

  public archivo!: CustomFile;
  public editForm!: FormGroup;
  public chofer!: Chofer;

  constructor(
    private fb: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private choferesService: ChoferesService,
  ) {
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    const idChofer = String(this.rutaActiva.snapshot.paramMap.get('idChofer'));
    if (idChofer) {
      this.obtenerChoferPorId(idChofer);
    }
  }

  inicializarFormulario() {
    this.editForm = this.fb.group({
      idChofer: [{ value: null, disabled: true }],
      matriculaChofer: [{ value: null, disabled: true }],
      nombreChofer: [{ value: null, disabled: true }],
      unidadAdscripcion: [{ value: null, disabled: true }],
      idUnidadAdscripcion: [{ value: null, disabled: true }],
      unidadOoad: [{ value: null, disabled: true }],
      fecInicioContrato: [{ value: null, disabled: true }],
      fecFinContrato: [{ value: null, disabled: true }],
      categoria: [{ value: null, disabled: true }],
      estatusChofer: [{ value: null, disabled: true }],
      motivo: [{ value: null, disabled: true }],
      licencia: [{ value: null, disabled: true }],
      tipoLicencia: [{ value: null, disabled: true }],
      fecVigencia: [{ value: null, disabled: true }],
      fecExpedicion: [{ value: null, disabled: true }],
      desrutaLicencia: [{ value: null, disabled: true }],
    });
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
