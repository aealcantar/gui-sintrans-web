import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
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
  
  archivo!: CustomFile;
  readonly ALTA_ASEGURADORA = 'La aseguradora ha sido dada de alta exitosamente.'
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private aseguradoraService: AseguradoraService,
    private alertService: AlertasFlotantesService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void { 
    this.form = this.fb.group({
      nombreAseguradora: new FormControl('', Validators.required),
      poliza: new FormControl('', Validators.required),
      fechaVencimiento: new FormControl(null, Validators.required),
      fechaExpiracion: new FormControl(null),
      costoPoliza: new FormControl('', Validators.required),
      tipoCobertura: new FormControl('', Validators.required),
      tipoSiniestro: new FormControl('', Validators.required),
      matricula: new FormControl('XXXXXX'),
      sistema: new FormControl(true),
      rutaPoliza: new FormControl(''),
      nombreArchivo: new FormControl(''),
      archivoLocal: new FormControl(''),
    });
  }

  guardar() {
    let usuarioAutenticado: any = JSON.parse(localStorage.getItem(TRANSPORTES_USUARIO) as string);
    this.form.controls['matricula'].setValue(usuarioAutenticado.matricula);
    const data = this.form.getRawValue();
    data.nombreArchivo = this.archivo?.archivo?.name;
    data.fechaVencimiento = this.datePipe.transform(
      data.fechaVencimiento,
      'dd/mm/yyyy'
    );
    data.fechaExpiracion = data.fechaVencimiento;
    this.aseguradoraService.save(data, this.archivo.archivo).subscribe(
      (respuesta) => {
        this.alertService.mostrar('exito', this.ALTA_ASEGURADORA)
        this.route.navigate(["../"], { relativeTo: this.router });
      });
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
