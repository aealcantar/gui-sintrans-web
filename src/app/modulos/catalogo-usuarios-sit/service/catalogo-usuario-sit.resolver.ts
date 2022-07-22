import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogoUsuarioSitResolver implements Resolve<any> {
  constructor(private usaurioService: UsuarioService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const page = 0;
    const records = 15;

    return this.usaurioService.get(page, '','','');
  }
}
