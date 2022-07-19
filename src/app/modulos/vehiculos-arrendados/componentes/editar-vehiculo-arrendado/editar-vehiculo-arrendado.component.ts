import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-vehiculo-arrendado',
  templateUrl: './editar-vehiculo-arrendado.component.html',
  styleUrls: ['./editar-vehiculo-arrendado.component.scss']
})
export class EditarVehiculoArrendadoComponent implements OnInit {
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
