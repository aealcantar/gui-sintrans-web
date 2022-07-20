import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss']
})
export class ChoferesComponent implements OnInit {
  mostrarModal: boolean = false;

  choferes: any[] = [
    {
      id: 'D613',
      matricula: '000000',
      nombre: 'Nombre completo del chofer',
      adscripcion: 'Adscripción',
      ooad:'OOAD',
      estatus: 'Incapacidad'
    },
    {
      id: 'D613',
      matricula: '000000',
      nombre: 'Nombre completo del chofer',
      adscripcion: 'Adscripción',
      ooad:'OOAD',
      estatus: 'Incapacidad'
    },
    {
      id: 'D613',
      matricula: '000000',
      nombre: 'Nombre completo del chofer',
      adscripcion: 'Adscripción',
      ooad:'OOAD',
      estatus: 'Incapacidad'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
