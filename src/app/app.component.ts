import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng-lts/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig, private router: Router) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }

}
