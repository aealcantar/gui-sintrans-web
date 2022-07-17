import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-separador',
  templateUrl: './separador.component.html',
  styleUrls: ['./separador.component.scss']
})
export class SeparadorComponent implements OnInit {

  @Input()
  texto!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
