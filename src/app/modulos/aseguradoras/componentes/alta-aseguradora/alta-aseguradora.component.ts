import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';

import { AseguradoraService } from '../service/aseguradora.service';

@Component({
  selector: 'app-alta-aseguradora',
  templateUrl: './alta-aseguradora.component.html',
  styleUrls: ['./alta-aseguradora.component.scss'],
  providers: [DatePipe],
})
export class AltaAseguradoraComponent implements OnInit {
  archivo!: CustomFile;
  readonly MENSAJE_EXITO = 'La aseguradora ha sido dada de alta exitosamente.'
  form;
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private aseguradoraService: AseguradoraService,
    private alertService: AlertasFlotantesService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombreAseguradora: new FormControl('', Validators.required),
      poliza: new FormControl('', Validators.required),
      fechaVencimiento: new FormControl('', Validators.required),
      fechaExpiracion: new FormControl('', Validators.required),
      costoPoliza: new FormControl('', Validators.required),
      tipoCobertura: new FormControl('', Validators.required),
      tipoSiniestro: new FormControl('', Validators.required),
      matricula: new FormControl('XXXXXX', Validators.required),
      sistema: new FormControl(true, Validators.required),
      rutaPoliza: new FormControl('', Validators.required),
      nombreArchivo: new FormControl('', Validators.required),
      archivoLocal: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void { }

  guardar() {
    console.log(this.form.getRawValue());
    const data = this.form.getRawValue();
    data.nombreArchivo = this.archivo?.archivo?.name;
    data.fechaVencimiento = this.datePipe.transform(
      data.fechaVencimiento,
      'dd/mm/yyyy'
    );
    data.fechaExpiracion = data.fechaVencimiento;
    //data.archivoLocal = 'file:///C:/Users/aivillafan/Downloads/Curriculum.pdf'
    this.aseguradoraService.save(data, this.archivo.archivo).subscribe((res) => {
      console.log(res);
      this.alertService.mostrar('exito', this.MENSAJE_EXITO)
      this.route.navigate(["../"], { relativeTo: this.router });
    });
  }



  get f() {
    return this.form.controls;
  }

}
