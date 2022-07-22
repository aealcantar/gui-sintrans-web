import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleUsuarioSitResolver implements Resolve<any> {
  constructor(private usurioService  : UsuarioService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const idUsuario = route.paramMap.get('idUsuario');
    return this.usurioService.buscarPorId(idUsuario)
  }
}
