import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';

@Component({
  selector: 'app-alta-choferes',
  templateUrl: './alta-choferes.component.html',
  styleUrls: ['./alta-choferes.component.scss'],
  providers: [
    DatePipe
  ]
})
export class AltaChoferesComponent implements OnInit {

  form!: FormGroup;

  ooad: any = [
    {
      label: 'Valor 1', value: 1
    },
    {
      label: 'Valor 2', value: 2
    },
    {
      label: 'Valor 3', value: 3
    }
  ];

  archivos: any[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }


  inicializarForm(): void {
    this.form = this.formBuilder.group({
      matricula: new FormControl('', Validators.required),
      inicioContrato: new FormControl(null, Validators.required),
      motivo: new FormControl('', Validators.required)
    });
  }

  guardar(){

  }

  get f() {
    return this.form.controls;
  }

}
