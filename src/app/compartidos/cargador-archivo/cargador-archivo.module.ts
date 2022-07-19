import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargadorArchivoComponent } from './cargador-archivo.component';
import { FileUploadModule } from 'primeng-lts/fileupload';



@NgModule({
  declarations: [
    CargadorArchivoComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule
  ],
  exports:[
    CargadorArchivoComponent
  ]
})
export class CargadorArchivoModule { }
