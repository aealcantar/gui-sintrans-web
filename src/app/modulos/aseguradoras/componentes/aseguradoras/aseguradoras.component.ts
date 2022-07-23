import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AseguradoraService } from '../service/aseguradora.service';

@Component({
  selector: 'app-aseguradoras',
  templateUrl: './aseguradoras.component.html',
  styleUrls: ['./aseguradoras.component.scss'],
})
export class AseguradorasComponent implements OnInit {
  mostrarModal: boolean = false;

  aseguradoras: any[] = [];
  aseguradora: any;
  nombreAseguradora: string='';

  constructor(private aseguradoraService : AseguradoraService, private router :ActivatedRoute) {}

  ngOnInit(): void {
    const respuesta = this.router.snapshot.data['respuesta']
    console.log(respuesta)
    this.aseguradoras = respuesta.datos.content
  }


  mostrarModalEliminar(aseguradora:any){
    this.aseguradora = aseguradora
    this.mostrarModal = true
  }
}
