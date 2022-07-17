import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo-estatus-enajenacion-vehiculo',
  templateUrl: './catalogo-estatus-enajenacion-vehiculo.component.html',
  styleUrls: ['./catalogo-estatus-enajenacion-vehiculo.component.scss']
})
export class CatalogoEstatusEnajenacionVehiculoComponent implements OnInit {

  mostrarModal: boolean = false;

  unidades: any[] = [
    {
      id: 1,
      estatus: 'Estatus de enajenación de vehículo 1',

    },
    {
      id: 2,
      estatus: 'Estatus de enajenación de vehículo 2',

    },
    {
      id: 3,
      estatus: 'Estatus de enajenación de vehículo 3',

    },
    {
      id: 4,
      estatus: 'Estatus de enajenación de vehículo 4',

    },
    {
      id: 5,
      estatus: 'Estatus de enajenación de vehículo 5',

    },
    {
      id: 6,
      estatus: 'Estatus de enajenación de vehículo 6',

    },
    {
      id: 7,
      estatus: 'Estatus de enajenación de vehículo 7',

    },
    {
      id: 8,
      estatus: 'Estatus de enajenación de vehículo 8',

    },
    {
      id: 9,
      estatus: 'Estatus de enajenación de vehículo 9',

    },
    {
      id: 10,
      estatus: 'Estatus de enajenación de vehículo 10',

    },
    {
      id: 11,
      estatus: 'Estatus de enajenación de vehículo 11',

    },
    {
      id: 12,
      estatus: 'Estatus de enajenación de vehículo 12',

    },
    {
      id: 13,
      estatus: 'Estatus de enajenación de vehículo 13',

    },
    {
      id: 14,
      estatus: 'Estatus de enajenación de vehículo 14',

    },
    {
      id: 15,
      estatus: 'Estatus de enajenación de vehículo 15',

    },
    {
      id: 16,
      estatus: 'Estatus de enajenación de vehículo 16',

    },
    {
      id: 17,
      estatus: 'Estatus de enajenación de vehículo 17',

    },
    {
      id: 18,
      estatus: 'Estatus de enajenación de vehículo 18',

    },
    {
      id: 19,
      estatus: 'Estatus de enajenación de vehículo 19',

    },
    {
      id: 20,
      estatus: 'Estatus de enajenación de vehículo 20',

    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
