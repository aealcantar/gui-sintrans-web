import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-tarjeta-electronica-combustible',
  templateUrl: './detalle-tarjeta-electronica-combustible.component.html',
  styleUrls: ['./detalle-tarjeta-electronica-combustible.component.scss']
})
export class DetalleTarjetaElectronicaCombustibleComponent implements OnInit {

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
  es = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    today: 'Hoy',
    clear: 'Borrar'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
