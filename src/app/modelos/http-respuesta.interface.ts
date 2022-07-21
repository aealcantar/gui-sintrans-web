import { TipoUnidad } from "./paginacion";

export interface HttpRespuesta<T> {
    codigo: number;
    mensaje: string;
    error: boolean;
    datos: T;
    [x: string]: any;
}