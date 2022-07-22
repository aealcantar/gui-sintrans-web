import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CatalogoVehiculosPropiosService } from '../../vehiculos-propios/servicios/catalogo-vehiculos-propios.service';
import { VehiculoEnajenacionService } from './vehiculo-enajenacion.service';
import { VehiculoPropioEnajenacionServiceService } from './vehiculo-propio-enajenacion-service.service';

@Injectable()
export class EditarErtatusEnajenacionVehiculoResolver implements Resolve<any> {
  constructor(
    private estatusEnajenacionService: VehiculoEnajenacionService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const idvehiculo = route.paramMap.get('idEstatus');

    return this.estatusEnajenacionService.buscarPorId(idvehiculo);
  }
}
