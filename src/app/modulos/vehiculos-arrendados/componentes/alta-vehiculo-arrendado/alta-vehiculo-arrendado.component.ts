import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-vehiculo-arrendado',
  templateUrl: './alta-vehiculo-arrendado.component.html',
  styleUrls: ['./alta-vehiculo-arrendado.component.scss']
})
export class AltaVehiculoArrendadoComponent implements OnInit {
  
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
