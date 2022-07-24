import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      }
    );
  }

  inicializarForm(unidad: any): void {
    this.form = this.formBuilder.group({
      ooad: new FormControl({ value: unidad.ooad.idOoad, disabled: true }, Validators.required),
      nombreUnidad: new FormControl({ value: unidad.nomUnidadAdscripcion, disabled: true }, Validators.required),
      unidad: new FormControl({ value: parseInt(unidad.desTipoUnidad), disabled: true }, Validators.required),
      pernocta: new FormControl({ value: !!unidad.indUnidadPernocta, disabled: true }, Validators.required),
      unInf: new FormControl({ value: unidad.numUnInf, disabled: true }, Validators.required),
      unOpe: new FormControl({ value: unidad.numUnOpe, disabled: true }, Validators.required),
      cp: new FormControl({ value: unidad.codigoPostal.cveCodigoPostal, disabled: true }, Validators.required),
      cc: new FormControl({ value: unidad.numCc, disabled: true }, Validators.required),
      cu: new FormControl({ value: unidad.numCu, disabled: true }, Validators.required),
      div: new FormControl({ value: unidad.numDiv, disabled: true }, Validators.required),
      sdiv: new FormControl({ value: unidad.numSdiv, disabled: true }, Validators.required),
      entidad: new FormControl({ value: '', disabled: true }, Validators.required),
      municipio: new FormControl({ value: '', disabled: true }, Validators.required),
      colonia: new FormControl({ value: unidad.nomColonia, disabled: true }, Validators.required)
    });
  }

}
