import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Unidad } from 'src/app/modelos/unidad.interface';
import { CatalogoUnidadesService } from '../../servicios/catalogo-unidades.service';

@Component({
  selector: 'app-detalle-unidad',
  templateUrl: './detalle-unidad.component.html',
  styleUrls: ['./detalle-unidad.component.scss']
})
export class DetalleUnidadComponent implements OnInit {
  readonly POSICION_UNIDAD = 0;
  readonly POSICION_CATALOGO_OOAD = 1;
  readonly POSICION_CATALOGO_UNIDAD = 2;
  idUnidad: any;
  catUnidad: any[] = [];
  catOoad: any[] = [];

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private unidadService: CatalogoUnidadesService
  ) { }

  ngOnInit(): void {
    let respuesta = this.route.snapshot.data['respuesta'];
    let unidad = respuesta[this.POSICION_UNIDAD].datos;
    this.idUnidad = unidad.idUnidad;
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
    this.inicializarForm(unidad);
    this.obtenerInformacionPorCP(unidad.codigoPostal);
  }

  obtenerInformacionPorCP(cp: any): void {
    this.unidadService.buscarPorCP(cp).subscribe(
      (respuesta) => {
        this.form.get('entidad')?.setValue(respuesta.datos[0].nomEntidad);
        this.form.get('municipio')?.setValue(respuesta.datos[0].nomMunicipio);
      }
    );
  }

  inicializarForm(unidad: any): void {
    this.form = this.formBuilder.group({
      ooad: [unidad.ooad.nombreOoad, Validators.required],
      nombreUnidad: [unidad.nombreUnidad, Validators.required],
      unidad: [unidad.descripcionTipoUnidad, Validators.required],
      pernocta: [!!unidad.pernocta, Validators.required],
      unInf: [unidad.unInf, Validators.required],
      unOpe: [unidad.unOpe, Validators.required],
      cp: [unidad.codigoPostal, Validators.required],
      cc: [unidad.nomCc, Validators.required],
      cu: [unidad.nomCu, Validators.required],
      div: [unidad.nomDiv, Validators.required],
      sdiv: [unidad.nomSdiv, Validators.required],
      entidad: ['', Validators.required],
      municipio: ['', Validators.required],
      colonia: [unidad.nombreColonia, Validators.required]
    });
  }

}
