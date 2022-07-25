import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CustomFile } from 'src/app/compartidos/cargador-archivo/custom-file';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { ArchivoService } from 'src/app/servicios/archivo-service';
import { AseguradoraService } from '../service/aseguradora.service';

@Component({
  selector: 'app-editar-aseguradora',
  templateUrl: './editar-aseguradora.component.html',
  styleUrls: ['./editar-aseguradora.component.scss'],
  providers: [DatePipe]
})
export class EditarAseguradoraComponent implements OnInit {

  readonly ACTUALIZA_ASEGURADORA = 'La aseguradora ha sido guardada exitosamente.'
  respuesta: any;
  aseguradora: any;
  idAseguradora!: number;
  form!: FormGroup;
  archivo!: CustomFile;

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private datePipe: DatePipe,
    private aseguradoraService: AseguradoraService,
    private alertService: AlertasFlotantesService,
    private cargadorService: CargadorService,
    private archivoService: ArchivoService
  ) { }

  ngOnInit(): void {
    this.respuesta = this.router.snapshot.data['respuesta']
    const aseguradora = this.respuesta.datos;
    this.idAseguradora = aseguradora.idAseguradora;
    this.archivo = {
      ruta: aseguradora.rutaPoliza
    };
    this.inicializarForm(aseguradora);
    this.inicializarArchivo(aseguradora);
  }

  inicializarForm(aseguradora: any): void {
    this.form = this.fb.group({
      nombreAseguradora: new FormControl(aseguradora.nombreAseguradora, Validators.required),
      poliza: new FormControl(aseguradora.poliza, Validators.required),
      fechaVencimiento: new FormControl(aseguradora.fechaVencimiento ? new Date(aseguradora.fechaVencimiento) : null, Validators.required),
      fechaExpiracion: new FormControl(aseguradora.fechaExpiracion ? new Date(aseguradora.fechaExpiracion) : null, Validators.required),
      costoPoliza: new FormControl(aseguradora.costoPoliza, Validators.required),
      tipoCobertura: new FormControl(aseguradora.tipoCobertura, Validators.required),
      tipoSiniestro: new FormControl(aseguradora.tipoSiniestro, Validators.required),
      matricula: new FormControl(aseguradora.matricula),
      sistema: new FormControl(aseguradora.sistema),
      nombreArchivo: new FormControl(aseguradora.nombreArchivo ? aseguradora.nombreArchivo : ''),
      archivoLocal: new FormControl(aseguradora.archivoLocal ? aseguradora.archivoLocal : ''),
      rutaPoliza: new FormControl(aseguradora.rutaPoliza)
    });
  }

  inicializarArchivo(aseguradora: any) {
    this.archivo = {
      ruta: aseguradora.rutaPoliza
    };
  }

  editar(): void {
    this.cargadorService.activar();
    this.archivoService.obtenerArchivosDeCustomFiles(this.archivo).pipe(
      switchMap((archivoRespuesta: File[]) => {
        const data = this.form.getRawValue();
        console.log("DATOS: ", this.form.value);
        data.fechaVencimiento = this.datePipe.transform(data.fechaVencimiento, 'dd/MM/yyyy'); 
        data.fechaExpiracion = this.datePipe.transform(data.fechaExpiracion, 'dd/MM/yyyy');
        return this.aseguradoraService.actualizarAseguradora(this.idAseguradora, data, archivoRespuesta[0])
      })
    ).subscribe(
      (respuesta: any) => {
        this.cargadorService.desactivar();
        this.alertService.mostrar('exito', this.ACTUALIZA_ASEGURADORA)
        this.route.navigate(["../.."], { relativeTo: this.router });
      }, (error: HttpErrorResponse) => {
        this.cargadorService.desactivar();
        console.error("ERROR: ", error);
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
