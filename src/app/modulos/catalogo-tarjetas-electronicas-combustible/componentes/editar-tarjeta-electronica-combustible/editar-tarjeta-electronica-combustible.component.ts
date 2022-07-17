import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-tarjeta-electronica-combustible',
  templateUrl: './editar-tarjeta-electronica-combustible.component.html',
  styleUrls: ['./editar-tarjeta-electronica-combustible.component.scss']
})
export class EditarTarjetaElectronicaCombustibleComponent implements OnInit {

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
