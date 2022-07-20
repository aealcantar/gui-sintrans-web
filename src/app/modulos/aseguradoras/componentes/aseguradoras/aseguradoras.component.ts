import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aseguradoras',
  templateUrl: './aseguradoras.component.html',
  styleUrls: ['./aseguradoras.component.scss']
})
export class AseguradorasComponent implements OnInit {

  mostrarModal: boolean = false;

  aseguradoras: any[] = [
    {
      id:1,
      aseguradora: 'Nombre de aseguradora',
      poliza: 'Póliza',
      fechaVencimiento: 'dd/mm/aaaa',
      costoPoliza:'$000,000.00'
    },
    {
      id:2,
      aseguradora: 'Nombre de aseguradora',
      poliza: 'Póliza',
      fechaVencimiento: 'dd/mm/aaaa',
      costoPoliza:'$000,000.00'
    },
    {
      id:3,
      aseguradora: 'Nombre de aseguradora',
      poliza: 'Póliza',
      fechaVencimiento: 'dd/mm/aaaa',
      costoPoliza:'$000,000.00'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
