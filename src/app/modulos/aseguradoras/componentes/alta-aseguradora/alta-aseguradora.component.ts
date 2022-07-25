import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { TRANSPORTES_USUARIO } from 'src/app/servicios/seguridad/autenticacion.service';

import { AseguradoraService } from '../service/aseguradora.service';

@Component({
  selector: 'app-alta-aseguradora',
  templateUrl: './alta-aseguradora.component.html',
  styleUrls: ['./alta-aseguradora.component.scss'],
  providers: [DatePipe],
})
export class AltaAseguradoraComponent implements OnInit {

  readonly ALTA_ASEGURADORA = 'La aseguradora ha sido dada de alta exitosamente.'
  archivo!: CustomFile;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private aseguradoraService: AseguradoraService,
    private alertService: AlertasFlotantesService,
    private route: Router,
    private router: ActivatedRoute,
    private cargadorService: CargadorService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreAseguradora: new FormControl(null, Validators.required),
      poliza: new FormControl(null, Validators.required),
      fechaVencimiento: new FormControl(null, Validators.required),
      fechaExpiracion: new FormControl(null),
      costoPoliza: new FormControl(null, Validators.required),
      tipoCobertura: new FormControl(null, Validators.required),
      tipoSiniestro: new FormControl(null, Validators.required),
      matricula: new FormControl(null),
      sistema: new FormControl(true),
      rutaPoliza: new FormControl(''),
      nombreArchivo: new FormControl(''),
      archivoLocal: new FormControl(''),
    });
  }

  guardar() {
    this.cargadorService.activar();
    let usuarioAutenticado: any = JSON.parse(localStorage.getItem(TRANSPORTES_USUARIO) as string);
    this.form.controls['matricula'].setValue(usuarioAutenticado.matricula);
    let aseguradora = this.form.getRawValue();
    aseguradora.nombreArchivo = this.archivo?.archivo?.name;
    aseguradora.fechaVencimiento = this.datePipe.transform(aseguradora.fechaVencimiento, 'dd/MM/YYYY');
    aseguradora.fechaExpiracion = aseguradora.fechaVencimiento;
    this.aseguradoraService.guardarAseguradora(aseguradora, this.archivo.archivo).subscribe(
      (respuesta) => {
        this.cargadorService.desactivar();
        this.alertService.mostrar('exito', this.ALTA_ASEGURADORA)
        this.route.navigate(["../"], { relativeTo: this.router });
      },
      (error: HttpErrorResponse) => {
        console.error("ERROR: ", error);
        this.cargadorService.desactivar();
      }
    );
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