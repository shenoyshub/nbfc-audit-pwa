import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
  provideAppInitializer,
  inject
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import {
  provideAuth
} from 'angular-auth-oidc-client';

import { routes } from './app.routes';
import { oidcConfig } from './auth/oidc.config';
import { provideStore } from '@ngrx/store';
import { AppInitService } from './services/app-init.service';
import { appInitFactory } from './factories/app-init.factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAuth({
        config: oidcConfig
    }),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    provideStore()
    // ,

    // // 👇 APP INITIALIZER
    //  provideAppInitializer(() => {
    //   const appInitService = inject(AppInitService);
    // //   return appInitService.init();
    // })
]
};
