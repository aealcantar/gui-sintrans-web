import { Component, OnInit } from '@angular/core';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  constructor(private alertasFlotantesService: AlertasFlotantesService) { }

  ngOnInit(): void {
  }

  iniciarSesion() {
    this.alertasFlotantesService.mostrar('error', 'El usuario ha sido dado de alta correctamente.');
  }

}
