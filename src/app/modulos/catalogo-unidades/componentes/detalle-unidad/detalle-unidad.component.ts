import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unidad } from 'src/app/modelos/unidad.interface';

@Component({
  selector: 'app-detalle-unidad',
  templateUrl: './detalle-unidad.component.html',
  styleUrls: ['./detalle-unidad.component.scss']
})
export class DetalleUnidadComponent implements OnInit {
  catUnidad!: Unidad;
  ooad: any = [
    {
      label: 'Valor 1', value: 1
    },
    {
      label: 'Valor 2', value: 2
    },
    {
      label: 'Valor 3', value: 3
    }
  ];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.catUnidad = this.route.snapshot.data['catUnidad'];
  }

}