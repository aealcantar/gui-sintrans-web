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

  obtenerAseguradoras(pagina: any, tamanio: any, nombreAseguradora: any,sort:any ) {
    const opt = {
      params: {
        pagina,
        tamanio,
        nombreAseguradora,
        sort
      },
    };
    return this._http.get<any>(`${this._base}`, opt);
  }
  consultaPaginada(page: any, size: any, filtros?: any) {
    return this._http.post<any>(`${this._base}/${page}/${size}`, filtros);
  }
  findById(id: any) {
    console.log(`consultando ${id}`);
    return this._http.get<any>(`${this._base}/id/${id}`);
  }
  save(aseguradora: any, file: any) {
    let data = new FormData();
    const datos = JSON.stringify(aseguradora);
    data.append('aseguradora', datos);
    data.append('archivo', file);
    return this._http.post<any>(`${this._base}`, data);
  }

  delete(aseguradoraId: any) {
    return this._http.delete<any>(`${this._base}/delete/${aseguradoraId}`);
  }
  update(aseguradoraId: any, aseguradora: any, archivo: any) {
    const formData = new FormData()
    formData.append('archivo', archivo)
    formData.append('aseguradora', JSON.stringify(aseguradora))
    return this._http.put<any>(
      `${this._base}/${aseguradoraId}`,
      formData
    );
  }
}
