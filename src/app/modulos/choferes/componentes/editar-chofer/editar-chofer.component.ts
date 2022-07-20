import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-chofer',
  templateUrl: './editar-chofer.component.html',
  styleUrls: ['./editar-chofer.component.scss']
})
export class EditarChoferComponent implements OnInit {

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

  archivos:any[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
