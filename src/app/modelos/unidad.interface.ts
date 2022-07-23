import { Ooad } from "./ooad.interface";

export interface Unidad {
    idUnidad?: number;
    nomUnidadAdscripcion?: string;
    ooad?: Ooad;
    desTipoUnidad?: string;
    indUnidadPernocta?: boolean;
}