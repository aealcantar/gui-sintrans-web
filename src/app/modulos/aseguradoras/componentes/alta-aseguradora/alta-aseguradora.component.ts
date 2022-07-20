import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-aseguradora',
  templateUrl: './alta-aseguradora.component.html',
  styleUrls: ['./alta-aseguradora.component.scss']
})
export class AltaAseguradoraComponent implements OnInit {

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
