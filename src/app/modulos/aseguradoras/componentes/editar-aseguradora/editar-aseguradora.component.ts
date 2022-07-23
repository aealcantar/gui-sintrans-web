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
  providers : [DatePipe]
})
export class EditarAseguradoraComponent implements OnInit {
  readonly MENSAJE = 'La aseguradora ha sido guardada exitosamente.'
  respuesta: any;
  aseguradora: any;
  form;
  archivos: CustomFile[] = [];
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private datePipe : DatePipe,
    private aseguradoraService: AseguradoraService,
    private alertService : AlertasFlotantesService
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
    console.log(this.respuesta)
    const a = this.respuesta.datos
    this.archivos.push({
      ruta : a.rutaPoliza
    })
this.form.controls['idAseguradora'].setValue(a.idAseguradora)
this.form.controls['nombreAseguradora'].setValue(a.nombreAseguradora)
this.form.controls['poliza'].setValue(a.poliza)
this.form.controls['fechaVencimiento'].setValue(this.datePipe.transform(a.fechaVencimiento , 'dd/MM/YYYY'))
this.form.controls['fechaExpiracion'].setValue(a.fechaExpiracion)
this.form.controls['costoPoliza'].setValue(a.costoPoliza)
this.form.controls['tipoCobertura'].setValue(a.tipoCobertura)
this.form.controls['tipoSiniestro'].setValue(a.tipoSiniestro)
this.form.controls['matricula'].setValue(a.matricula)
this.form.controls['sistema'].setValue(a.sistema)
this.form.controls['nombreArchivo'].setValue(a.nombreArchivo)
this.form.controls['archivoLocal'].setValue(a.archivoLocal)
this.form.controls['rutaPoliza'].setValue(a.rutaPoliza)

console.log(this.form.value)
  }

  guardar(){
/**
 *    data.fechaVencimiento = this.datePipe.transform(
      data.fechaVencimiento,
      'dd/mm/yyyy'
    );
 */



const data = this.form.getRawValue()
const file = this.archivos[0].archivo
data.fechaExpiracion = this.datePipe.transform(
  data.fechaExpiracion,
  'dd/mm/yyyy'
);
this.aseguradoraService.update(data.idAseguradora , data , file).subscribe(res=>{
  console.log(res)
  this.alertService.mostrar('exito' , this.MENSAJE)
  this.route.navigate(["../../"], { relativeTo: this.router });
})
  }

  get f() {
    return this.form.controls;
  }
}
