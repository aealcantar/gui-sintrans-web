import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-catalogo-usuarios-sit',
  templateUrl: './catalogo-usuarios-sit.component.html',
  styleUrls: ['./catalogo-usuarios-sit.component.scss'],
})
export class CatalogoUsuariosSitComponent implements OnInit {
  mostrarModal: boolean = false;
  inicioPagina: number = 0;
  respuesta: any;
  usuarios: any[] = [];
  usuario: any;
  unidad: any;
  validarDatos: boolean = false;
  form;
  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private alertService: AlertasFlotantesService
  ) {
    this.form = fb.group({
      matricula: new FormControl('', Validators.required),
      nombreUsuario: new FormControl('', Validators.required),
      ooad: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.respuesta = this.route.snapshot.data['respuesta'];
    console.log(this.respuesta);
    this.usuarios = this.respuesta!.data.content;
    console.log(this.usuarios);
  }
  buscar() {
    if (this.form.valid) {
      const datos = this.form.getRawValue();
      this.usuarioService
        .get(0, datos.matricula, datos.nombreUsuario, datos.ooad)
        .subscribe((response) => {
          this.usuarios = response!.data.content;
        });
    } else {
      this.validarDatos = true;
      this.onFormChange();
    }
  }
  onFormChange() {
    this.form.valueChanges.subscribe((res) => {
      if (this.form.valid) {
        this.validarDatos = false;
      }
    });
  }
  limpiar() {
    this.usuarios = [];
    this.form.reset();
    this.usuarioService.get(0, '', '', '').subscribe((response) => {
      this.usuarios = response!.data.content;
    });
  }
  abrirModal(usuario: any) {
    this.usuario = usuario;
    this.mostrarModal = true;
  }
  eliminar() {
    this.usuarioService.eliminar(this.usuario.idUsuario).subscribe((res) => {
      const index = this.usuarios.findIndex(
        (u) => u.idUsuario === this.usuario.idUsuario
      );
      this.usuarios.splice(index, 1);
      this.usuario = null;
      this.mostrarModal = false;
      this.alertService.mostrar('exito', 'El registro ha sido eliminado exitosamente');
    });
  }
  paginacion(event:any){
    const inicio = event.first;
    const pagina = Math.floor(inicio / 10)
    const tamanio = event.rows
    const filtros = this.form.getRawValue()
    this.usuarioService.get(pagina,filtros.matricula,filtros.nombreUsuario,filtros.ooad).subscribe(respuesta=>{
      this.usuarios = []
      this.respuesta = null;
      this.respuesta = respuesta
      this.usuarios = respuesta.data.content;
    })
  }
}
