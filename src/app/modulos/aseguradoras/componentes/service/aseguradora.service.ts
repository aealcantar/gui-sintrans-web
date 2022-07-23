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
  page(page: any, size: any, filtros?: any) {
    return this._http.post<any>(`${this._base}/${page}/${size}`, filtros);
  }
  findById(id: any) {
    console.log(`consultando ${id}`);
    return this._http.get<any>(`${this._base}/id/${id}`);
  }
  save(aseguradora: any, file: any) {
    let data = new FormData();
    const datos = JSON.stringify(aseguradora);
    console.log(datos);
    data.append('aseguradora', datos);
    data.append('archivo', file);
    console.log(data);
    return this._http.post<any>(`${this._base}`, data);
  }

  delete(aseguradoraId: any) {
    return this._http.delete<any>(`${this._base}/delete/${aseguradoraId}`);
  }
  update(aseguradoraId: any, aseguradora: any) {
    return this._http.put<any>(
      `${this._base}/update/${aseguradoraId}`,
      aseguradora
    );
  }
}