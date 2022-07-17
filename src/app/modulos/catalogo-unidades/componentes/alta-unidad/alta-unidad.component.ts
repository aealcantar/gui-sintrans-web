import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-unidad',
  templateUrl: './alta-unidad.component.html',
  styleUrls: ['./alta-unidad.component.scss']
})
export class AltaUnidadComponent implements OnInit {

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
