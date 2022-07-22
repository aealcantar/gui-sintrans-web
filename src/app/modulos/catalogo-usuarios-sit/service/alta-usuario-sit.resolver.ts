import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { UsuarioSitOoadService } from './usuario-sit-ooad.service';
import { UsuarioSitRolService } from './usuario-sit-rol.service';

@Injectable({
  providedIn: 'root'
})
export class AltaUsuarioSitResolver implements Resolve<any> {
  constructor(private usuarioRolService :UsuarioSitRolService,
    private usuarioOoadService: UsuarioSitOoadService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const rol = this.usuarioRolService.buscarTodos()
    const ooad = this.usuarioOoadService.buscarTodos()
    return forkJoin([rol,ooad])
  }
}
