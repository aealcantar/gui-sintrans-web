import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-usuario-sit',
  templateUrl: './alta-usuario-sit.component.html',
  styleUrls: ['./alta-usuario-sit.component.scss']
})
export class AltaUsuarioSitComponent implements OnInit {
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
