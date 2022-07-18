import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OperacionesComunes } from './operaciones-comunes.interface';

export abstract class BaseService<T, ID> implements OperacionesComunes<T, ID> {

    constructor(
        protected _http: HttpClient,
        protected _base: string
    ) { }

    guardar(t: T): Observable<T> {
        return this._http.post<T>(this._base, t);
    }

    actualizar(id: ID, t: T): Observable<T> {
        return this._http.put<T>(this._base + "/" + id, t, {});
    }

    buscarPorId(id: ID): Observable<T> {
        return this._http.get<T>(this._base + "/" + id);
    }

    buscarTodos(): Observable<T[]> {
        return this._http.get<T[]>(this._base)
    }

    buscarPorPagina(pagina: number, tamanio: number): Observable<T> {
        return this._http.get<T>(this._base + `?pagina=${pagina}&tamanio=${tamanio}`)
    }

    eliminar(id: ID): Observable<T> {
        return this._http.delete<T>(this._base + '/' + id);
    }
}
