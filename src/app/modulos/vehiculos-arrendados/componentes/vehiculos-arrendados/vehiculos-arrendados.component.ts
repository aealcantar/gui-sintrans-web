import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehiculos-arrendados',
  templateUrl: './vehiculos-arrendados.component.html',
  styleUrls: ['./vehiculos-arrendados.component.scss']
})
export class VehiculosArrendadosComponent implements OnInit {
  mostrarModal: boolean = false;

  vehiculos: any[] = [
    {
      id: 1,
      ecco: 'D613',
      noTarjeton: '123456789123456',
      marca: 'Chevrolet',
      modelo: '2010',
      arrendadora:'Arrendadora',
      tipoServicio: 'Traslado de pacientes a terapia intensiva',
      estatus: 'Siniestrado en tránsito'
    },
    {
      id: 2,
      ecco: 'D613',
      noTarjeton: '123456789123456',
      marca: 'Chevrolet',
      modelo: '2010',
      arrendadora:'Arrendadora',
      tipoServicio: 'Traslado de pacientes a terapia intensiva',
      estatus: 'Siniestrado en tránsito'
    },
    {
      id: 3,
      ecco: 'D613',
      noTarjeton: '123456789123456',
      marca: 'Chevrolet',
      modelo: '2010',
      arrendadora:'Arrendadora',
      tipoServicio: 'Traslado de pacientes a terapia intensiva',
      estatus: 'Siniestrado en tránsito'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
