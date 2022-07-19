import { Component, Input, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { CargadorService } from './cargador.service';

@Component({
  selector: 'app-cargador',
  templateUrl: './cargador.component.html',
  styleUrls: ['./cargador.component.scss']
})
export class CargadorComponent implements OnInit {

  @Input()
  activarCargadorEnRutas = false;

  constructor(
    public cargadorService: CargadorService,
    private router: Router
  ) {

  }

  ngOnInit() {
    if (this.activarCargadorEnRutas) {
      this.router.events.subscribe(
        event => {
          if (
            event instanceof NavigationStart ||
            event instanceof RouteConfigLoadStart
          ) {
            this.cargadorService.activar();
          } else if (
            event instanceof NavigationEnd ||
            event instanceof NavigationError ||
            event instanceof NavigationCancel ||
            event instanceof RouteConfigLoadEnd
          ) {
            this.cargadorService.desactivar();
          }
        }
      )
    }
  }

}
