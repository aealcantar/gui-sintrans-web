import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-usuario-sit',
  templateUrl: './detalle-usuario-sit.component.html',
  styleUrls: ['./detalle-usuario-sit.component.scss']
})
export class DetalleUsuarioSitComponent implements OnInit {
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
