import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AseguradoraService } from './aseguradora.service';

@Injectable({
  providedIn: 'root'
})
export class AseguradoraDetalleResolver implements Resolve<any> {
  constructor(private aseguradoraService : AseguradoraService){}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const aseguradoraId = route.paramMap.get('idAseguradora');

    return this.aseguradoraService.buscarPorId(aseguradoraId)
  }
}
