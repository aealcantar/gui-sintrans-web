import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-usuario-sit',
  templateUrl: './editar-usuario-sit.component.html',
  styleUrls: ['./editar-usuario-sit.component.scss']
})
export class EditarUsuarioSitComponent implements OnInit {
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
