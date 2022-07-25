import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { Chofer } from 'src/app/modelos/chofer.interface';
import { ChoferesService } from '../../servicios/choferes.service';
import { DatePipe } from '@angular/common';
import {
  CATALOGO_ESTATUS_CHOFER,
  CATALOGO_ESTATUS_CHOFER_BAJA,
  CATALOGO_ESTATUS_CHOFER_BLOQUEADO
} from 'src/app/utilerias/catalogos';
import * as moment from 'moment';
@Component({
  selector: 'app-detalle-chofer',
  templateUrl: './detalle-chofer.component.html',
  styleUrls: ['./detalle-chofer.component.scss'],
  providers: [DatePipe],
})
export class DetalleChoferComponent implements OnInit {
  public archivo!: CustomFile;
  public editForm!: FormGroup;
  public chofer!: Chofer;
  public catEstatus: any[] = CATALOGO_ESTATUS_CHOFER;
  public catMotivo: any[] = [];

  constructor(
    private fb: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private choferesService: ChoferesService,
    private datePipe: DatePipe,
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
      idChofer: new FormControl({ value: null, disabled: true }),
      nombreChofer: new FormControl({ value: null, disabled: true }),
      cveUnidadAdscripcion: new FormControl({ value: null, disabled: true }),
      idUnidadAdscripcion: new FormControl({ value: null, disabled: true }),
      cveUnidadOOAD: new FormControl({ value: null, disabled: true }),
      desCategoria: new FormControl({ value: null, disabled: true }),
      cveMatriculaChofer: new FormControl({ value: null, disabled: true }),
      matricula: new FormControl({ value: null, disabled: true }),
      fecInicioContrato: new FormControl({ value: null, disabled: true }),
      fecFinContrato: new FormControl({ value: null, disabled: true }),
      fecIniIncapacidad: new FormControl({ value: null, disabled: true }),
      fecFinIncapacidad: new FormControl({ value: null, disabled: true }),
      estatusChofer: new FormControl({ value: null, disabled: true }),
      desMotivo: new FormControl({ value: null, disabled: true }),
      cveLicencia: new FormControl({ value: null, disabled: true }),
      cveTipoLicencia: new FormControl({ value: null, disabled: true }),
      fecVigencia: new FormControl({ value: null, disabled: true }),
      fecExpedicion: new FormControl({ value: null, disabled: true }),
      desrutaLicencia: new FormControl({ value: null, disabled: true }),
    });
  }

  obtenerChoferPorId(id: any) {
    this.choferesService.buscarPorId(id).subscribe(
      (respuesta) => {
        if (respuesta && respuesta?.datos) {
          this.cambioEstatus(parseInt(respuesta?.datos.estatusChofer));
          this.inicializarArchivos(respuesta?.datos.desrutaLicencia);
          this.editForm.patchValue({
            ...respuesta?.datos,
            fecInicioContrato: respuesta?.datos.fecInicioContrato &&
              this.datePipe.transform(respuesta?.datos.fecInicioContrato, 'dd/MM/YYYY'),
            fecFinContrato: respuesta?.datos.fecFinContrato &&
              this.datePipe.transform(respuesta?.datos.fecFinContrato, 'dd/MM/YYYY'),
            fecIniIncapacidad: respuesta?.datos.fecIniIncapacidad &&
              this.datePipe.transform(respuesta?.datos.fecIniIncapacidad, 'dd/MM/YYYY'),
            fecFinIncapacidad: respuesta?.datos.fecFinIncapacidad &&
              this.datePipe.transform(respuesta?.datos.fecFinIncapacidad, 'dd/MM/YYYY'),
            fecVigencia: respuesta?.datos.fecVigencia &&
              this.datePipe.transform(respuesta?.datos.fecVigencia, 'dd/MM/YYYY'),
            fecExpedicion: respuesta?.datos.fecExpedicion &&
              this.datePipe.transform(respuesta?.datos.fecExpedicion, 'dd/MM/YYYY'),
            estatusChofer: parseInt(respuesta?.datos.estatusChofer),
            desMotivo: parseInt(respuesta?.datos.desMotivo),
          });          
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  inicializarArchivos(ruta: any) {
    this.archivo = { ruta };
  }

  cambioEstatus(idEstatus: number) {
    this.catMotivo = [];
    if (idEstatus === 1) {
      this.catMotivo = CATALOGO_ESTATUS_CHOFER_BAJA;
    } else if (idEstatus === 2) {
      this.catMotivo = CATALOGO_ESTATUS_CHOFER_BLOQUEADO;
    }
  }

  validarArchivo(event: any) {
    console.log(event);
  }

  get f() {
    return this.editForm.controls;
  }

}
