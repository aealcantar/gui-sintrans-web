import { Injectable } from '@angular/core';
import { MessageService } from 'primeng-lts/api';

/**
 * Servicio que permite mostrar las alertas flotantes del sistema.
 */
@Injectable()
export class AlertasFlotantesService {

  constructor(private messageService: MessageService) { }

  /**
   * Muestra una alerta en la parte superior derecha.
   * @param tipo 
   * @param mensaje 
   * @param fijo 
   */
  mostrar(tipo: 'exito' | 'info' | 'precaucion' | 'error', mensaje: string, fijo?: boolean) {
    let severity = '';
    switch (tipo) {
      case 'exito': severity = 'success'; break;
      case 'info': severity = 'info'; break;
      case 'precaucion': severity = 'warn'; break;
      case 'error': severity = 'error'; break;
      default: severity = 'info'; break;
    }
    this.messageService.add({ severity, detail: mensaje, sticky: !!fijo });
  }

  /**
   * Limpia todas las alertas
   */
  limpiar() {
    this.messageService.clear();
  }

}
