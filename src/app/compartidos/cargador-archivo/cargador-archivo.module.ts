import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { CargadorArchivoComponent } from './cargador-archivo.component';
import { NombreArchivoPipe } from './nombre-archivo.pipe';


@NgModule({
  declarations: [
    CargadorArchivoComponent,
    NombreArchivoPipe
  ],
  imports: [
    CommonModule,
    FileUploadModule
  ],
  exports: [
    CargadorArchivoComponent,
    NombreArchivoPipe
  ],
  providers: [
    NombreArchivoPipe
  ]
})
export class CargadorArchivoModule { }
