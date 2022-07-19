import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-vehiculo-arrendado',
  templateUrl: './detalle-vehiculo-arrendado.component.html',
  styleUrls: ['./detalle-vehiculo-arrendado.component.scss']
})
export class DetalleVehiculoArrendadoComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
