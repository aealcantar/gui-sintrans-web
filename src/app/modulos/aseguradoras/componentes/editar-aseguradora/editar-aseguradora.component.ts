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
  idAseguradora!: number;
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
    this.idAseguradora = aseguradora.idAseguradora;
    this.archivo = {
      ruta: aseguradora.rutaPoliza
    };
    this.inicializarForm(aseguradora);
  }

  inicializarForm(aseguradora: any): void {
    this.form = this.fb.group({
      nombreAseguradora: new FormControl(aseguradora.nombreAseguradora, Validators.required),
      poliza: new FormControl(aseguradora.poliza, Validators.required),
      fechaVencimiento: new FormControl((aseguradora.fechaVencimiento ? new Date(aseguradora.fechaVencimiento) : null), Validators.required),
      fechaExpiracion: new FormControl(aseguradora.fechaExpiracion, Validators.required),
      costoPoliza: new FormControl(aseguradora.costoPoliza, Validators.required),
      tipoCobertura: new FormControl(aseguradora.tipoCobertura, Validators.required),
      tipoSiniestro: new FormControl(aseguradora.tipoSiniestro, Validators.required),
      matricula: new FormControl(aseguradora.matricula),
      sistema: new FormControl(aseguradora.sistema),
      nombreArchivo: new FormControl(aseguradora.nombreArchivo),
      archivoLocal: new FormControl(aseguradora.archivoLocal),
      rutaPoliza: new FormControl(aseguradora.rutaPoliza)
    });
  }

  editar(): void {
    const data = this.form.getRawValue()
    const file = this.archivo.archivo
    data.fechaExpiracion = this.datePipe.transform(
      data.fechaExpiracion,
      'dd/mm/yyyy'
    );
    this.aseguradoraService.actualizarAseguradora(data.idAseguradora, data, file).subscribe(res => {
      this.alertService.mostrar('exito', this.MENSAJE)
      this.route.navigate(["../../"], { relativeTo: this.router });
    })
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
