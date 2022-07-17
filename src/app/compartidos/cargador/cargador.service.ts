import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';


@Injectable()
export class CargadorService {

    private cargadorSubject = new BehaviorSubject<boolean>(false);

    cargador$: Observable<boolean> = this.cargadorSubject.asObservable();

    constructor() {
    }

    mostrarCargadorHastaCompletar<T>(obs$: Observable<T>): Observable<T> {
        return of(null)
            .pipe(
                tap(() => this.activar()),
                concatMap(() => obs$),
                finalize(() => this.desactivar())
            );
    }

    activar() {
        this.cargadorSubject.next(true);
    }

    desactivar() {
        this.cargadorSubject.next(false);
    }

}
