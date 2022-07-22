import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioSitUnidadService } from '../../service/usuario-sit-unidad.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-editar-usuario-sit',
  templateUrl: './editar-usuario-sit.component.html',
  styleUrls: ['./editar-usuario-sit.component.scss'],
})
export class EditarUsuarioSitComponent implements OnInit {
  validarDatos: boolean = false;
  ooads: Array<any> = [];
  roles: Array<any> = [];
  unidades: Array<any> = [];
  estatus: Array<any> = [
    { id: 1, label: 'Baja' },
    { id: 2, label: 'Cambio de adscripción' },
    { id: 3, label: 'Bloqueado' },
  ];
  motivos: Array<any> = [
    { id: 1, label: 'Defunción' },
    { id: 2, label: 'Jubilación' },
    { id: 3, label: 'Renuncia' },
  ];
  usuario: any;
  form;
  constructor(
    private router: ActivatedRoute,
    private usuarioService: UsuarioService,
    private unidadService: UsuarioSitUnidadService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      matricula: new FormControl('', Validators.required),
      estatusUsuario: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required),
      idRol: new FormControl('', Validators.required),
      unidad: new FormControl('', Validators.required),
      nombreUsuario: new FormControl('', Validators.required),
      apellidoPaterno: new FormControl('', Validators.required),
      apellidoMaterno: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      matriculaAudita: new FormControl('', Validators.required),
      indSistema: new FormControl(true, Validators.required),
      ooad: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const respuesta = this.router.snapshot.data['respuesta'];
    console.log(respuesta);
    this.usuario = respuesta[0].data;
    this.initForm();
    this.roles = respuesta[1].data;
    console.log(this.roles);
    this.ooads = respuesta[2].data;
    this.unidadService
      .consultarPorOoad(this.usuario.unidad.ooad.idOoad)
      .subscribe((response) => {
        this.unidades = response.data;
      });
  }

  initForm() {
    this.form.controls['matricula'].setValue(this.usuario.matricula);
    this.form.controls['estatusUsuario'].setValue(this.usuario.estatusUsuario);
    this.form.controls['idRol'].setValue(this.usuario.idRol);
    this.form.controls['unidad'].setValue(this.usuario.unidad.idUnidad);
    this.form.controls['nombreUsuario'].setValue(this.usuario.nombreUsuario);
    this.form.controls['ooad'].setValue(this.usuario.unidad.ooad.idOoad);
    this.form.controls['matriculaAudita'].setValue(this.usuario.matriculaAudita);
    this.form.controls['apellidoPaterno'].setValue(
      this.usuario.apellidoPaterno
    );
    this.form.controls['apellidoMaterno'].setValue(
      this.usuario.apellidoMaterno
    );
    this.form.controls['password'].setValue(this.usuario.password);
    const indexMotivo = this.motivos.findIndex(
      (m) => m.label == this.usuario.motivo
    );
    const indexEstatus = this.estatus.findIndex(
      (e) => e.label == this.usuario.estatusUsuario
    );
    console.log(indexMotivo, indexEstatus);
    this.form.controls['motivo'].setValue(this.motivos[indexMotivo].label);
    this.form.controls['estatusUsuario'].setValue(
      this.estatus[indexEstatus].label
    );
  }

  onOoadChange() {
    const ooad = this.form.controls['ooad'].value;
    this.unidadService.consultarPorOoad(ooad).subscribe((response) => {
      this.unidades = response.data;
    });
  }
  guardar() {
    if (this.form.valid) {
      const usuario = this.form.getRawValue();
      console.log(usuario)
      this.usuarioService.actualizar(this.usuario.idUsuario,usuario).subscribe(response=>{
      
          console.log('se guardo con exito',response)
        
      });
    } else {
      this.validarDatos = true;
      console.log(this.form.getRawValue())
      this.onFormChanges();
    }
  }
  onFormChanges() {
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.validarDatos = false;
      }
    });
  }
}
