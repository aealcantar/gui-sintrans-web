import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { CatalogoUnidadesService } from '../../servicios/catalogo-unidades.service';

@Component({
  selector: 'app-alta-unidad',
  templateUrl: './alta-unidad.component.html',
  styleUrls: ['./alta-unidad.component.scss']
})
export class AltaUnidadComponent implements OnInit {

  @ViewChild("input")
  codigoPostal!: ElementRef;

  readonly POSICION_CATALOGO_OOAD = 0;
  readonly POSICION_CATALOGO_UNIDAD = 1;
  readonly ALTA_UNIDAD = "La unidad ha sido dada de alta exitosamente.";
  catUnidad: any[] = [];
  catOoad: any[] = [];

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private unidadService: CatalogoUnidadesService,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService
  ) { }

  ngOnInit(): void {
    let respuesta = this.route.snapshot.data['respuesta'];
    this.catOoad = respuesta[this.POSICION_CATALOGO_OOAD].map(
      (ooad: any) => (
        {
          label: ooad.nombreOoad,
          value: ooad.idOoad
        }
      )
    );
    this.catUnidad = respuesta[this.POSICION_CATALOGO_UNIDAD].map(
      (unidad: any) => (
        {
          label: unidad.nombreUnidad,
          value: unidad.idUnidad
        }
      )
    );
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      ooad: ['', Validators.required],
      nombreUnidad: ['', Validators.required],
      unidad: ['', Validators.required],
      pernocta: [true, Validators.required],
      unInf: ['', Validators.required],
      unOpe: ['', Validators.required],
      cc: ['', Validators.required],
      cu: ['', Validators.required],
      div: ['', Validators.required],
      sdiv: ['', Validators.required],
      entidad: ['', Validators.required],
      municipio: ['', Validators.required],
      colonia: ['', Validators.required]
    });
  }

  guardar(): void {
    this.cargadorService.activar();
    let unidad: any = {
      ooad: this.form.get("ooad")?.value,
      nombreUnidad: this.form.get("nombreUnidad")?.value,
      tipoUnidad: this.form.get("unidad")?.value,
      pernocta: this.form.get("pernocta")?.value,
      unInf: this.form.get("unInf")?.value,
      unOpe: this.form.get("unOpe")?.value,
      nomCc: this.form.get("nomCc")?.value,
      nomCu: this.form.get("nomCu")?.value,
      nomDiv: this.form.get("nomDiv")?.value,
      nomSdiv: this.form.get("nomSdiv")?.value,
      codigoPostal: this.codigoPostal.nativeElement.value,
      nombreColonia: this.form.get("colonia")?.value,
      matricula: "0123456789", //Matricula del Usuario Logueado
      indiceSistema: 0
    };
    this.unidadService.guardar(unidad).subscribe(
      (respuesta) => {
        this.alertaService.mostrar("exito", this.ALTA_UNIDAD);
        this.cargadorService.desactivar();
        this.router.navigate(["../"], { relativeTo: this.route });
      },
      (error: HttpErrorResponse) => {
        this.cargadorService.desactivar();
        console.error("ERROR: ", error)
      }
    );
  }

  buscarPorCP(cveCodigoPostal: any): void {
    this.unidadService.buscarPorCP(cveCodigoPostal).subscribe(
      (respuesta) => {
        this.form.get('entidad')?.setValue(respuesta.datos[0].nomEntidad);
        this.form.get('municipio')?.setValue(respuesta.datos[0].nomMunicipio);
        this.form.get('colonia')?.setValue(respuesta.datos[0].colonia);
      }
    );
  }

  get f() {
    return this.form.controls;
  }

}
