import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { BaseService } from 'src/app/utilerias/base-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AseguradoraService extends BaseService<HttpRespuesta<any>, any> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.mssintetransAseguradoras}`);
  }

  obtenerAseguradoras(pagina: any, tamanio: any, nombreAseguradora: any) {
    const opt = {
      params: {
        pagina,
        tamanio,
        nombreAseguradora,
      },
    };
    return this._http.get<any>(`${this._base}`, opt);
  }

  consultaPaginada(page: any, size: any, filtros?: any) {
    return this._http.post<any>(`${this._base}/${page}/${size}`, filtros);
  }

  consultarPorId(id: any) {
    return this._http.get<any>(`${this._base}/id/${id}`);
  }

  save(aseguradora: any, file: any) {
    let formData = new FormData();
    const datos = JSON.stringify(aseguradora);
    formData.append('aseguradora', datos);
    formData.append('archivo', file);
    return this._http.post<any>(`${this._base}`, formData);
  }

  eliminar(aseguradoraId: any) {
    return this._http.delete<any>(`${this._base}/delete/${aseguradoraId}`);
  }

  actualizarAseguradora(aseguradoraId: any, aseguradora: any, archivo: any) {
    const formData = new FormData()
    formData.append('archivo', archivo)
    formData.append('aseguradora', JSON.stringify(aseguradora))
    return this._http.put<any>(
      `${this._base}/${aseguradoraId}`,
      formData
    );
  }
}
