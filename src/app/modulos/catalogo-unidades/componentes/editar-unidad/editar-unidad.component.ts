import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { Unidad } from 'src/app/modelos/unidad.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { TRANSPORTES_USUARIO } from 'src/app/servicios/seguridad/autenticacion.service';
import { CatalogoUnidadesService } from '../../servicios/catalogo-unidades.service';

@Component({
  selector: 'app-editar-unidad',
  templateUrl: './editar-unidad.component.html',
  styleUrls: ['./editar-unidad.component.scss']
})
export class EditarUnidadComponent implements OnInit {

  @ViewChild("input")
  codigoPostal!: ElementRef;

  readonly POSICION_UNIDAD = 0;
  readonly POSICION_CATALOGO_OOAD = 1;
  readonly POSICION_CATALOGO_UNIDAD = 2;
  readonly ACTUALIZA_UNIDAD = "La unidad ha sido guardada exitosamente.";
  idUnidad!: number;
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
    let unidad = respuesta[this.POSICION_UNIDAD].datos;
    this.idUnidad = unidad.idUnidad;
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
    this.inicializarForm(unidad);
    this.obtenerInformacionPorCP(unidad.codigoPostal.cveCodigoPostal);
  }

  obtenerInformacionPorCP(cp: any): void {
    this.unidadService.buscarPorCP(cp).subscribe(
      (respuesta) => {
        this.form.get('entidad')?.setValue(respuesta.datos[0].nomEstado);
        this.form.get('municipio')?.setValue(respuesta.datos[0].nomMunicipio);
        this.idCodigoPostal = respuesta.datos[0].idCodigoPostal;
      }
    );
  }

  inicializarForm(unidad: any): void {
    this.form = this.formBuilder.group({
      ooad: new FormControl(unidad.ooad.idOoad, Validators.required),
      nombreUnidad: new FormControl(unidad.nomUnidadAdscripcion, Validators.required),
      unidad: new FormControl(unidad.desTipoUnidad, Validators.required),
      pernocta: new FormControl(!!unidad.indUnidadPernocta, Validators.required),
      unInf: new FormControl(unidad.numUnInf, Validators.required),
      unOpe: new FormControl(unidad.numUnOpe, Validators.required),
      cp: new FormControl(unidad.codigoPostal.cveCodigoPostal, Validators.required),
      cc: new FormControl(unidad.numCc, Validators.required),
      cu: new FormControl(unidad.numCu, Validators.required),
      div: new FormControl(unidad.numDiv, Validators.required),
      sdiv: new FormControl(unidad.numSdiv, Validators.required),
      entidad: new FormControl({ value: '', disabled: true }, Validators.required),
      municipio: new FormControl({ value: '', disabled: true }, Validators.required),
      colonia: new FormControl(unidad.nomColonia, Validators.required)
    });
  }

  editar(): void {
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
    console.log("DATOS: ", unidad);
    this.unidadService.actualizar(this.idUnidad, unidad).subscribe(
      (respuesta) => {
        this.alertaService.mostrar("exito", this.ACTUALIZA_UNIDAD);
        this.cargadorService.desactivar();
        this.router.navigate(["../.."], { relativeTo: this.route });
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
