/**
 * Convierte un blob en un tipo File. Se puede usar cualquier ruta de archivo de linux y windows.
 * @param blob 
 * @param ruta 
 * @returns 
 */
export function convierteBlobEnFile(blob: any, ruta: string): any {
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