import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogoUnidad } from 'src/app/modelos/catalogo-unidad.interface';

@Component({
  selector: 'app-catalogo-unidades',
  templateUrl: './catalogo-unidades.component.html',
  styleUrls: ['./catalogo-unidades.component.scss']
})
export class CatalogoUnidadesComponent implements OnInit {

  catUnidades: CatalogoUnidad[] = [];

  mostrarModal: boolean = false;

  unidadesDummy: any[] = [
    {
      id: 1,
      nombreUnidad: 'Nombre de Unidad 1',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 2,
      nombreUnidad: 'Nombre de Unidad 2',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: false
    },
    {
      id: 3,
      nombreUnidad: 'Nombre de Unidad 3',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 4,
      nombreUnidad: 'Nombre de Unidad 4',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 5,
      nombreUnidad: 'Nombre de Unidad 5',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: false
    },
    {
      id: 6,
      nombreUnidad: 'Nombre de Unidad 6',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: false
    },
    {
      id: 7,
      nombreUnidad: 'Nombre de Unidad 7',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 8,
      nombreUnidad: 'Nombre de Unidad 8',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 9,
      nombreUnidad: 'Nombre de Unidad 9',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 10,
      nombreUnidad: 'Nombre de Unidad 10',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 11,
      nombreUnidad: 'Nombre de Unidad 11',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 12,
      nombreUnidad: 'Nombre de Unidad 12',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 13,
      nombreUnidad: 'Nombre de Unidad 13',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 14,
      nombreUnidad: 'Nombre de Unidad 14',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 15,
      nombreUnidad: 'Nombre de Unidad 15',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 16,
      nombreUnidad: 'Nombre de Unidad 16',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 17,
      nombreUnidad: 'Nombre de Unidad 17',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 18,
      nombreUnidad: 'Nombre de Unidad 18',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 19,
      nombreUnidad: 'Nombre de Unidad 19',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    },
    {
      id: 20,
      nombreUnidad: 'Nombre de Unidad 20',
      ooad: 'OOAD',
      tipoUnidad: 'Tipo de unidad',
      unidadPercnota: true
    }
  ];
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.catUnidades = this.route.snapshot.data["catUnidades"];
  }

}
