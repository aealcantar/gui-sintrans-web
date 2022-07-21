import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { AutenticacionService } from 'src/app/servicios/seguridad/autenticacion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cargadorService: CargadorService,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private alertaFlotante: AlertasFlotantesService
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion() {
    let usuario: string = this.form.get('usuario')?.value;
    let password: string = this.form.get('password')?.value;
    this.cargadorService.activar();
    this.autenticacionService.iniciarSesion(usuario, password).subscribe(
      (respuesta) => {
        this.cargadorService.desactivar();
        if (respuesta.data) {
          this.router.navigateByUrl('/inicio');
        } else if (respuesta.mensaje === 'usuario-pasword') {
          this.form.reset();
          this.alertaFlotante.mostrar('error', 'Credenciales incorrectas');
        } else if (respuesta.mensaje === 'bloqueado') {
          this.form.reset();
          this.alertaFlotante.mostrar('error', 'Excediste el número de intentos permitidos, el usuario fue bloqueado.');
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.cargadorService.desactivar();
      }
    );
  }

  get f() {
    return this.form.controls;
  }

}