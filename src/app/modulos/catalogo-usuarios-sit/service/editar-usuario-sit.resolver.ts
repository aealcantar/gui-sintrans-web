import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { UsuarioSitOoadService } from './usuario-sit-ooad.service';
import { UsuarioSitRolService } from './usuario-sit-rol.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class EditarUsuarioSitResolver implements Resolve<any> {
  constructor(
    private usuarioService: UsuarioService,
    private rolService: UsuarioSitRolService,
    private ooadService: UsuarioSitOoadService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const idUsuario = route.paramMap.get('idUsuario');
    const usuario = this.usuarioService.buscarPorId(idUsuario);
    const roles = this.rolService.buscarTodos()
    const ooads = this.ooadService.buscarTodos();
    return forkJoin([usuario,roles,ooads])
  }
}
