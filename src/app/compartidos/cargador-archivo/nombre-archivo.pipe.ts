import { Pipe, PipeTransform } from '@angular/core';

/**
 * Obtiene el nombre del archivo de una ruta absoluta sin importar si es windows o linux.
 */
@Pipe({
  name: 'nombreArchivo'
})
export class NombreArchivoPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.split('\\')?.pop()?.split('/').pop() as string;
  }

}
