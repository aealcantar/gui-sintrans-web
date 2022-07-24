import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { AseguradoraService } from '../service/aseguradora.service';

@Component({
  selector: 'app-editar-aseguradora',
  templateUrl: './editar-aseguradora.component.html',
  styleUrls: ['./editar-aseguradora.component.scss'],
  providers: [DatePipe]
})
export class EditarAseguradoraComponent implements OnInit {
  readonly MENSAJE = 'La aseguradora ha sido guardada exitosamente.'
  respuesta: any;
  aseguradora: any;
  form;
  archivo!: CustomFile;
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private datePipe: DatePipe,
    private aseguradoraService: AseguradoraService,
    private alertService: AlertasFlotantesService
  ) {
    this.form = this.fb.group({
      idAseguradora: new FormControl('', Validators.required),
      nombreAseguradora: new FormControl('', Validators.required),
      poliza: new FormControl('', Validators.required),
      fechaVencimiento: new FormControl('', Validators.required),
      fechaExpiracion: new FormControl('', Validators.required),
      costoPoliza: new FormControl('', Validators.required),
      tipoCobertura: new FormControl('', Validators.required),
      tipoSiniestro: new FormControl('', Validators.required),
      matricula: new FormControl('', Validators.required),
      sistema: new FormControl('', Validators.required),
      rutaPoliza: new FormControl(''),
      nombreArchivo: new FormControl(''),
      archivoLocal: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.respuesta = this.router.snapshot.data['respuesta']
    const aseguradora = this.respuesta.datos;
    this.archivo = {
      ruta: aseguradora.rutaPoliza
    };
    this.form.controls['idAseguradora'].setValue(aseguradora.idAseguradora)
    this.form.controls['nombreAseguradora'].setValue(aseguradora.nombreAseguradora)
    this.form.controls['poliza'].setValue(aseguradora.poliza)
    this.form.controls['fechaVencimiento'].setValue(this.datePipe.transform(aseguradora.fechaVencimiento, 'dd/MM/YYYY'))
    this.form.controls['fechaExpiracion'].setValue(aseguradora.fechaExpiracion)
    this.form.controls['costoPoliza'].setValue(aseguradora.costoPoliza)
    this.form.controls['tipoCobertura'].setValue(aseguradora.tipoCobertura)
    this.form.controls['tipoSiniestro'].setValue(aseguradora.tipoSiniestro)
    this.form.controls['matricula'].setValue(aseguradora.matricula)
    this.form.controls['sistema'].setValue(aseguradora.sistema)
    this.form.controls['nombreArchivo'].setValue(aseguradora.nombreArchivo)
    this.form.controls['archivoLocal'].setValue(aseguradora.archivoLocal)
    this.form.controls['rutaPoliza'].setValue(aseguradora.rutaPoliza)
  }

  guardar() {
    const data = this.form.getRawValue()
    const file = this.archivo.archivo
    data.fechaExpiracion = this.datePipe.transform(
      data.fechaExpiracion,
      'dd/mm/yyyy'
    );
    this.aseguradoraService.update(data.idAseguradora, data, file).subscribe(res => {
      this.alertService.mostrar('exito', this.MENSAJE)
      this.route.navigate(["../../"], { relativeTo: this.router });
    })
  }

  get f() {
    return this.form.controls;
  }
}
