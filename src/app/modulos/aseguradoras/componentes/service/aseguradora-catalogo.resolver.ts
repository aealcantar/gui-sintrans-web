import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AseguradoraService } from './aseguradora.service';

@Injectable({
  providedIn: 'root',
})
export class AseguradoraCatalogoResolver implements Resolve<any> {
  constructor(private aseguradoraService: AseguradoraService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const filtro = {};
    return this.aseguradoraService.obtenerAseguradoras(0, 10, '');
  }
}
