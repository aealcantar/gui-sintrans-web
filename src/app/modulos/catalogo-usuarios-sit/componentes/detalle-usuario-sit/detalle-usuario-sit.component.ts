import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioSitRolService } from '../../service/usuario-sit-rol.service';

@Component({
  selector: 'app-detalle-usuario-sit',
  templateUrl: './detalle-usuario-sit.component.html',
  styleUrls: ['./detalle-usuario-sit.component.scss'],
})
export class DetalleUsuarioSitComponent implements OnInit {
  usuario: any;
  idUsuario!: number;
  rol: any={descripcion : ""}
  constructor(
    private router: ActivatedRoute,
    private rolService: UsuarioSitRolService
  ) {}

  ngOnInit(): void {
    const respuesta = this.router.snapshot.data['respuesta'];
    this.usuario = respuesta.data;
    this.idUsuario = this.usuario.idUsuario;
    console.log("USUARIO: ", this.usuario);
    this.rolService.buscarPorId(this.usuario.idRol).subscribe((response) => {
      this.rol = response.data;
    });
  }
}
