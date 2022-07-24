import * as moment from "moment";
import { TipoDropdown } from "../modelos/tipo-dropdown";

/**
 * Convierte un blob en un tipo File. Se puede usar cualquier ruta absoluta de archivo de linux y windows.
 * @param blob 
 * @param ruta 
 * @returns 
 */
export function convierteBlobEnFile(blob: any, ruta: string): File {
    return new File([blob], obtenerNombreArchivoDeRuta(ruta));
}

/**
 *  Obtiene de una ruta de linux o windows el nombre del archivo.
 * @param ruta 
 * @returns 
 */
export function obtenerNombreArchivoDeRuta(ruta: string): any {
    return ruta.split('\\')?.pop()?.split('/').pop();
}


/**
 *  Obtiene de una ruta de linux o windows el nombre del archivo.
 * @param ruta 
 * @returns 
 */
export function mapearArregloTipoDropdown(arr: [] = [], label: string, value: string): TipoDropdown[] {
    return arr.map(obj => ({
        label: obj[label],
        value: obj[value]
    }));
}


/**
 * Convierte fechas especificando un formato inicial y formato final
 * 
 * Ref:  https://momentjs.com/docs/#/use-it/
 * @param fecha 
 */
export function convierteFecha(fecha: string, formatoInicial: string, formatoFinal: string): string {
    //DD --> dias
    //MM --> meses
    //YYYY --> años
    //DD-MM-YYY --> 15-15-2022
    //let variableParaFormato = moment(fecha, 'DD-MM-YYYY');
    //return variableParaFormato.format('YYYY-MM-DD');
    let variableParaFormato = moment(fecha, formatoInicial);
    return variableParaFormato.format(formatoFinal);
}