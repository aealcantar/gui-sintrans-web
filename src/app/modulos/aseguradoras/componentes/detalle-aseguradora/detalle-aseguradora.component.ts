import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-aseguradora',
  templateUrl: './detalle-aseguradora.component.html',
  styleUrls: ['./detalle-aseguradora.component.scss'],
})
export class DetalleAseguradoraComponent implements OnInit {
  archivos: any[] = [];
  constructor(private router: ActivatedRoute) {}
  aseguradora: any;


  ngOnInit(): void {
    const respuesta = this.router.snapshot.data['respuesta'];
   this.aseguradora = respuesta.data
  }
}
