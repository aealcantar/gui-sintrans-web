import { Component, EventEmitter, HostBinding, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cargador-archivo',
  templateUrl: './cargador-archivo.component.html',
  styleUrls: ['./cargador-archivo.component.scss'],
})
export class CargadorArchivoComponent implements OnInit {

  /**
   * Especifica un arreglo de string con las extensiones aceptadas.
   * Ejemplo: ['png','jpg','jpeg'] o ['pdf','docx','csv','xlsx']
   * No importa si las extensiones vienen en mayusculas o minusculas
   */
  private _extensionesAceptadas: string[] = [];

  /**
   * Especifica el tipo de archivo aceptado.
   * Ejemplo: application/pdf o image/*
   */
  private _patronAceptado: string = '';

  /**
   * Especifica el tamaño maximo en bytes
   */
  private _tamanioMaximo!: number;

  /**
   * Deshabilita el componente.
   */
  private _disabled: boolean = false;

  @Input()
  archivos: File[] = [];

  @HostBinding('class.ng-invalid')
  invalid: boolean = this.archivos.length === 0;

  @Input()
  multiple: boolean = false;

  @Output()
  archivosChange = new EventEmitter<File[]>();

  /**
   * Emite el archivo que se eliminara de la lista
   */
  @Output()
  eliminarEmitter: EventEmitter<File> = new EventEmitter<File>();

  /**
   * Emite el archivo que se descargara de la lista
   */
  @Output()
  descargarEmitter: EventEmitter<File> = new EventEmitter<File>();

  /**
   * Emite las validaciones que se activan cuando se excede el tamaño maximo o la extension del archivo es incorrecta.
   */
  @Output()
  errorEmitter: EventEmitter<{ mensaje: string, archivo: File }> = new EventEmitter<{ mensaje: string, archivo: File }>();

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  set patronAceptado(patronAceptado: string) {
    this._patronAceptado = patronAceptado;
  }

  @Input()
  get patronAceptado() {
    return this._patronAceptado;
  }

  set tamanioMaximo(tamanioMaximo: number) {
    this._tamanioMaximo = tamanioMaximo;
  }

  @Input()
  get tamanioMaximo(): number {
    return this._tamanioMaximo;
  }

  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }

  @Input()
  get disabled() {
    return this._disabled;
  }

  set extensionesAceptadas(extensionesAceptadas: string[]) {
    this._extensionesAceptadas = extensionesAceptadas;
  }

  @Input()
  get extensionesAceptadas() {
    return this._extensionesAceptadas;
  }

  seleccionar(event: any) {
    for (let archivo of event.files) {
      if (archivo.size > this._tamanioMaximo) {
        this.errorEmitter.emit({
          mensaje: 'Tamaño máximo excedido.',
          archivo: archivo
        });
        this.archivos = [];
        return;
      } else if (this.esExtensionInvalida(archivo)) {
        this.errorEmitter.emit({
          mensaje: 'El tipo de archivo es incorrecto.',
          archivo: archivo
        });
        this.archivos = [];
        return;
      }
      if (!this.multiple) {
        this.archivos = [];
      }
      this.archivos.push(archivo);
      this.archivosChange.emit(this.archivos);
    }
  }

  esExtensionInvalida(archivo: File) {
    let ext = archivo.name.split('.').pop();
    let extEncontrada = this.extensionesAceptadas.find((extAceptadas: string) => extAceptadas.toLowerCase() === ext?.toLowerCase());
    if (!extEncontrada) {
      return true;
    }
    return false;
  }

  descargar(archivoSeleccionado: any) {
    let indiceArchivo: number = this.archivos.findIndex(f => f === archivoSeleccionado);
    if (indiceArchivo !== -1) {
      this.descargarEmitter.emit(this.archivos[indiceArchivo]);
      let url = window.URL.createObjectURL(this.archivos[indiceArchivo]);
      let link = this.renderer.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', url);
      link.setAttribute('download', this.archivos[indiceArchivo].name);
      link.click();
      //window.URL.revokeObjectURL(url);
      link.remove();
    }
  }

  eliminar(archivoSeleccionado: File) {
    let indiceArchivo: number = this.archivos.findIndex((archivo: File) => archivo === archivoSeleccionado);
    if (indiceArchivo !== -1) {
      this.eliminarEmitter.emit(this.archivos[indiceArchivo]);
      this.archivos.splice(indiceArchivo, 1);
    }
  }

}
