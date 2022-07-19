import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehiculos-propios',
  templateUrl: './vehiculos-propios.component.html',
  styleUrls: ['./vehiculos-propios.component.scss']
})
export class VehiculosPropiosComponent implements OnInit {

  mostrarModal: boolean = false;

  vehiculos: any[] = [
    {
      id: 1,
      ecco: 'D613',
      noTarjeton: '123456789123456',
      marca: 'Chevrolet',
      modelo: '2010',
      tipoServicio: 'Traslado de pacientes a terapia intensiva',
      estatus: 'Siniestrado en tránsito'
    },
    {
      id: 2,
      ecco: 'D613',
      noTarjeton: '123456789123456',
      marca: 'Chevrolet',
      modelo: '2010',
      tipoServicio: 'Traslado de pacientes a terapia intensiva',
      estatus: 'Siniestrado en tránsito'
    },
    {
      id: 3,
      ecco: 'D613',
      noTarjeton: '123456789123456',
      marca: 'Chevrolet',
      modelo: '2010',
      tipoServicio: 'Traslado de pacientes a terapia intensiva',
      estatus: 'Siniestrado en tránsito'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
