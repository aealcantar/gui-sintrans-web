import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-vehiculo-propio',
  templateUrl: './editar-vehiculo-propio.component.html',
  styleUrls: ['./editar-vehiculo-propio.component.scss']
})
export class EditarVehiculoPropioComponent implements OnInit {

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

  //Se debe crear un atributo de archivos por cada componente cargador-archivo que exista
  archivos: any[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  validarArchivo(event:any){
    console.log(event);
  }

}
