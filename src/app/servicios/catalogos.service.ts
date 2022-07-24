import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRespuesta } from '../modelos/http-respuesta.interface';

@Injectable()
export class CatalogosService {

  constructor(
    private _http: HttpClient
  ) { }

  obtenerCatalogoOoad(pagina: number, tamanio: number): Observable<HttpRespuesta<any>> {
    return this._http.get<HttpRespuesta<any>>(environment.api.mssintetransCatalogoOoad + `?pagina=${pagina}&tamanio=${tamanio}`)
  }

}
