import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { TRANSPORTES_USUARIO } from 'src/app/servicios/seguridad/autenticacion.service';
import { ALTA_INCORRECTA } from 'src/app/utilerias/constantes';
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
  idCodigoPostal!: number;

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
    this.catOoad = respuesta[this.POSICION_CATALOGO_OOAD].datos.map(
      (ooad: any) => (
        {
          label: ooad.nomOoad,
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
    let usuarioAutenticado: any = JSON.parse(localStorage.getItem(TRANSPORTES_USUARIO) as string);
    let unidad: any = {
      ooad: {
        idOoad: this.form.get("ooad")?.value
      },
      idOoad: this.form.get("ooad")?.value,
      nomUnidadAdscripcion: this.form.get("nombreUnidad")?.value,
      desTipoUnidad: this.form.get("unidad")?.value,
      indUnidadPernocta: this.form.get("pernocta")?.value ? "1" : "0",
      numUnInf: this.form.get("unInf")?.value,
      numUnOpe: this.form.get("unOpe")?.value,
      numCc: this.form.get("cc")?.value,
      numCu: this.form.get("cu")?.value,
      numDiv: this.form.get("div")?.value,
      numSdiv: this.form.get("sdiv")?.value,
      idCodigoPostal: this.idCodigoPostal,
      nomColonia: this.form.get("colonia")?.value,
      cveMatricula: usuarioAutenticado.matricula
    };
    this.unidadService.guardar(unidad).subscribe(
      (respuesta) => {
        this.alertaService.mostrar("exito", this.ALTA_UNIDAD);
        this.cargadorService.desactivar();
        this.router.navigate(["../"], { relativeTo: this.route });
      },
      (error: HttpErrorResponse) => {
        this.cargadorService.desactivar();
        this.alertaService.mostrar("error", ALTA_INCORRECTA);
        console.error("ERROR: ", error)
      }
    );
  }

  buscarPorCP(cveCodigoPostal: any): void {
    this.unidadService.buscarPorCP(cveCodigoPostal).subscribe(
      (respuesta) => {
        this.form.get('entidad')?.setValue(respuesta.datos[0].nomEstado);
        this.form.get('municipio')?.setValue(respuesta.datos[0].nomMunicipio);
        this.idCodigoPostal = respuesta.datos[0].idCodigoPostal;
      }
    );
  }

  get f() {
    return this.form.controls;
  }

}
