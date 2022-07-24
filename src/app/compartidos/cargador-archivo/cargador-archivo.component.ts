import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CargadorService } from '../cargador/cargador.service';
import { CustomFile } from './custom-file';
import { NombreArchivoPipe } from './nombre-archivo.pipe';

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
   * Ejemplo: application/pdf o image/*. Hace referencia al atributo "accept" de los input de tipo file
   */
  private _accept: string = '';

  /**
   * Especifica el tamaño maximo en bytes
   */
  private _tamanioMaximo!: number;

  /**
   * Deshabilita el componente.
   */
  private _disabled: boolean = false;

  /**
   * Muestra el boton de descarga.
   */
  private _mostrarBtnDescargar: boolean = false;

  @Input()
  archivo!: CustomFile;

  @Output()
  archivoChange = new EventEmitter<CustomFile>();

  @HostBinding('class.ng-invalid')
  invalid: boolean = this.archivo ? false : true;

  /**
   * Emite el archivo que se elimino
   */
  @Output()
  eliminarEmitter: EventEmitter<CustomFile> = new EventEmitter<CustomFile>();

  /**
   * Emite el archivo que se descargara
   */
  @Output()
  descargarEmitter: EventEmitter<CustomFile> = new EventEmitter<CustomFile>();

  /**
   * Emite las validaciones que se activan cuando se excede el tamaño maximo o la extension del archivo es incorrecta.
   */
  @Output()
  errorEmitter: EventEmitter<{ mensaje: string, archivo: CustomFile }> = new EventEmitter<{ mensaje: string, archivo: CustomFile }>();

  constructor(
    private renderer: Renderer2,
    private httpClient: HttpClient,
    private cargador: CargadorService,
    private nombreArchivoPipe: NombreArchivoPipe
  ) { }

  ngOnInit(): void {
  }

  set accept(accept: string) {
    this._accept = accept;
  }

  @Input()
  get accept() {
    return this._accept;
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

  set mostrarBtnDescargar(mostrarBtnDescargar: boolean) {
    this._mostrarBtnDescargar = mostrarBtnDescargar;
  }

  @Input()
  get mostrarBtnDescargar() {
    return this._mostrarBtnDescargar;
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
      let customFile: CustomFile = {
        archivo,
        ruta: ''
      };
      if (customFile.archivo && customFile.archivo.size > this._tamanioMaximo) {
        this.errorEmitter.emit({
          mensaje: 'Tamaño máximo excedido.',
          archivo: customFile
        });
        return;
      } else if (this.esExtensionInvalida(customFile)) {
        this.errorEmitter.emit({
          mensaje: 'El tipo de archivo es incorrecto.',
          archivo: customFile
        });
        return;
      }
      this.archivo = customFile;
      this.archivoChange.emit(this.archivo);
    }
  }

  esExtensionInvalida(customFile: CustomFile) {
    let ext = customFile?.archivo?.name.split('.').pop();
    let extEncontrada = this.extensionesAceptadas.find((extAceptadas: string) => extAceptadas.toLowerCase() === ext?.toLowerCase());
    return !extEncontrada ? true : false;
  }

  descargar() {
    this.descargarEmitter.emit(this.archivo as CustomFile);
    if (this.archivo?.ruta) {
      this.cargador.activar();
      this.httpClient.post(`${environment.api.mssintetransCargaArchivos}/descargar-archivo`, {
        ruta: this.archivo?.ruta
      }, {
        responseType: 'blob' as any
      }).subscribe(
        (blob) => {
          this.cargador.desactivar();
          let url = window.URL.createObjectURL(blob as any);
          let link = this.renderer.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', url);
          link.setAttribute('download', this.nombreArchivoPipe.transform(this.archivo?.ruta as any));
          link.click();
          link.remove();
        },
        (httpError: HttpErrorResponse) => {
          this.cargador.desactivar();
        }
      )
    } else {
      let url = window.URL.createObjectURL(this.archivo?.archivo as File);
      let etiquetaAncla = this.renderer.createElement('a');
      etiquetaAncla.setAttribute('target', '_blank');
      etiquetaAncla.setAttribute('href', url);
      etiquetaAncla.setAttribute('download', this.archivo?.archivo?.name);
      etiquetaAncla.click();
      //window.URL.revokeObjectURL(url);
      etiquetaAncla.remove();
    }
  }

  eliminar() {
    let archivoEliminado: CustomFile = { ...this.archivo };
    this.eliminarEmitter.emit(archivoEliminado);
    (this.archivo as any) = undefined;
    this.archivoChange.emit(this.archivo);
  }

}
