import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { AutenticacionService } from 'src/app/servicios/seguridad/autenticacion.service';

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.component.html',
  styleUrls: ['./nueva-contrasena.component.scss']
})
export class NuevaContrasenaComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private autService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertaService: AlertasFlotantesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      nuevaContrasena: ['', Validators.required],
      confirmacionContrasena: ['', Validators.required]
    });
  }

  actualizarContrasena(): void {
    let idUsuario: any = this.activatedRoute.snapshot.paramMap.get('idUsuario');
    let nuevaContrasena: string = this.form.get('nuevaContrasena')?.value;
    let confirmacionContrasena: string = this.form.get('confirmacionContrasena')?.value;
    if (nuevaContrasena === confirmacionContrasena) {
      this.autService.actualizarContrasena(idUsuario, nuevaContrasena, confirmacionContrasena).subscribe(
        (respuesta: any) => {
          if (respuesta.mensaje === 'Exito') {
            this.alertaService.mostrar('exito', 'La contraseña ha sido actualizada exitosamente.');
            this.router.navigateByUrl('/inicio-sesion');
          } else if (respuesta.error) {
            this.alertaService.mostrar('error', 'Ocurrió un error al intentar actualizar la contraseña.');
            this.form.reset();
          }
        },
        (httpErrorResponse: HttpErrorResponse) => {
          console.error(httpErrorResponse);
          this.form.reset();
          this.alertaService.mostrar('error', 'Ocurrió un error al consultar la matrícula');
        }
      )
    } else {
      this.alertaService.mostrar('error', 'Las contraseñas no coinciden.');
    }

  }

  get f() {
    return this.form.controls;
  }
}
