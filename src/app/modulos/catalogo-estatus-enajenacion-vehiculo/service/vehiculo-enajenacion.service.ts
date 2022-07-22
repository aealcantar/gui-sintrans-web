import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { BaseService } from 'src/app/utilerias/base-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehiculoEnajenacionService extends BaseService<
  HttpRespuesta<any>,
  any
> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.mssintetransVehiculosEnajenacion}`);
  }

  update(idVehiculo: any, desEstatusEnajenacion: string) {
    const opt = {
      params: {
        desEstatusEnajenacion,
      },
    };
   return this._http.put(this._base + idVehiculo, null, opt);
  }
}