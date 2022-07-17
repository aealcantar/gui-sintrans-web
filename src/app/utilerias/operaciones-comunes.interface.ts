import { Observable } from "rxjs";

export interface OperacionesComunes<T, ID> {
    guardar(t: T): Observable<T>;
    actualizar(id: ID, t: T): Observable<T>;
    buscarPorId(id: ID): Observable<T>;
    buscarTodos(): Observable<T[]>;
    eliminar(id: ID): Observable<any>;
}
