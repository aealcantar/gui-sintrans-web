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
export class AseguradoraEditResolver implements Resolve<boolean> {
  constructor(private aseguradoraService : AseguradoraService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
  }
}
