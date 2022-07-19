import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-vehiculo-propio',
  templateUrl: './alta-vehiculo-propio.component.html',
  styleUrls: ['./alta-vehiculo-propio.component.scss']
})
export class AltaVehiculoPropioComponent implements OnInit {

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

  archivos: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  validarArchivo(event:any){
    console.log(event);
  }

  guardar(){
    console.log(this.archivos);
  }
}
