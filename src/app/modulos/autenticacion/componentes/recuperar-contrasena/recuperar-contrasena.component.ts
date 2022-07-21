import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { AutenticacionService } from 'src/app/servicios/seguridad/autenticacion.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private autService: AutenticacionService,
    private alertaService: AlertasFlotantesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      matricula: ['', Validators.required]
    });
  }

  recuperarContrasena() {
    let matricula = this.form.get('matricula')?.value;
    this.autService.validarMatricula(matricula).subscribe(
      (respuesta: any) => {
        if (respuesta.mensaje === 'usuarioInvalido') {
          this.alertaService.mostrar('info', 'Usuario inválido');
        } else if (respuesta.mensaje === 'Exito') {
          this.router.navigate(['../nueva-contrasena', respuesta.idUsuario], { relativeTo: this.activatedRoute });
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error(httpErrorResponse);
        this.alertaService.mostrar('error', 'Ocurrió un error al consultar la matrícula');
      }
    )
  }

  get f() {
    return this.form.controls;
  }

}
