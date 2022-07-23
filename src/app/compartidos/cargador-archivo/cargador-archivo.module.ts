import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargadorArchivoComponent } from './cargador-archivo.component';
import { FileUploadModule } from 'primeng-lts/fileupload';
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
