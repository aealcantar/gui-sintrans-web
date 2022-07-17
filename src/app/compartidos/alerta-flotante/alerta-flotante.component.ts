import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta-flotante',
  templateUrl: './alerta-flotante.component.html',
  styleUrls: ['./alerta-flotante.component.scss']
})
export class AlertaFlotanteComponent implements OnInit {
  
  @Input()
  mensaje!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
