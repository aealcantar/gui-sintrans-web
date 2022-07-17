import { TipoUnidad } from "./tipo-unidad.interface";

export interface CatalogoUnidad {
    id?: number;
    nombreUnidad?: string;
    ooad?: string;
    esUnidadPercnota?: boolean;
    catTipoUnidad?: TipoUnidad;
}