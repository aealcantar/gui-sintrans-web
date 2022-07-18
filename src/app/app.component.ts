import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng-lts/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private translateService: TranslateService
  ) { }


  ngOnInit() {
    this.primengConfig.ripple = true;
    this.translateService.setDefaultLang('es');
  }

  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
  }

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }

  ngAfterViewInit(): void {
    this.translate('es');
  }

}
