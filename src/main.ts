import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
//import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';

import { App } from './app/app';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';
import { AuthModule } from 'angular-auth-oidc-client';
import { oidcConfig } from './app/auth/oidc.config';
import { importProvidersFrom } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

Chart.register(...registerables);
bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    //provideAnimations(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
    }),
    // provideOidcClient(oidcConfig) 
      provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
    importProvidersFrom(
      AuthModule.forRoot(oidcConfig) // this is how v21 sets up OIDC
    ),
  ],
}).catch(err => console.error(err));
