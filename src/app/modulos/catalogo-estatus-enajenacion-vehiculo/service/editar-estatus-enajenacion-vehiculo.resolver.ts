import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CatalogoVehiculosPropiosService } from '../../vehiculos-propios/servicios/catalogo-vehiculos-propios.service';
import { VehiculoPropioEnajenacionServiceService } from './vehiculo-propio-enajenacion-service.service';

@Injectable()
export class EditarErtatusEnajenacionVehiculoResolver implements Resolve<any> {
  constructor(
    private vehiculoPropioService: VehiculoPropioEnajenacionServiceService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const idvehiculo = route.paramMap.get('idEstatus');

    return this.vehiculoPropioService.buscarPorId(idvehiculo);
  }
}
