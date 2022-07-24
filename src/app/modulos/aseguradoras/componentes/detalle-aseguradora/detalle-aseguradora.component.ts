import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';

@Component({
  selector: 'app-detalle-aseguradora',
  templateUrl: './detalle-aseguradora.component.html',
  styleUrls: ['./detalle-aseguradora.component.scss'],
  providers: [DatePipe],
})
export class DetalleAseguradoraComponent implements OnInit {
  archivoPoliza !: CustomFile;
  form;
  constructor(private router: ActivatedRoute, private fb: FormBuilder, private datePipe: DatePipe,) {
    this.form = this.fb.group({
      nombreAseguradora: new FormControl({ value: '', disabled: true },),
      poliza: new FormControl({ value: '', disabled: true }),
      fechaVencimiento: new FormControl({ value: '', disabled: true }),
      costoPoliza: new FormControl({ value: '', disabled: true }),
      tipoCobertura: new FormControl({ value: '', disabled: true }),
      tipoSiniestro: new FormControl({ value: '', disabled: true }),
      polizaFile: new FormControl({ value: '', disabled: true }),
    });
  }
  aseguradora: any;

  ngOnInit(): void {
    const respuesta = this.router.snapshot.data['respuesta'];
    const aseguradora = respuesta.datos;
    this.form.controls['nombreAseguradora'].setValue(
      aseguradora.nombreAseguradora
    );
    this.form.controls['poliza'].setValue(aseguradora.poliza);
    this.form.controls['fechaVencimiento'].setValue(
      this.datePipe.transform(aseguradora.fechaVencimiento, 'dd/MM/YYYY')
    );
    this.form.controls['costoPoliza'].setValue(aseguradora.costoPoliza);
    this.form.controls['tipoCobertura'].setValue(aseguradora.tipoCobertura);
    this.form.controls['polizaFile'].setValue(aseguradora.rutaPoliza);
    this.form.controls['tipoSiniestro'].setValue(aseguradora.tipoSiniestro);
    this.archivoPoliza = { ruta: aseguradora.rutaPoliza };
  }
}
