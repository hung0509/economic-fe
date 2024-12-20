import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { AuthService } from './service/auth.service';
//import { RefreshInterceptor } from './interceptor/error.interceptor'; //RefreshInterceptor
import { authInterceptor } from './interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor])),
    // { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useValue: RefreshInterceptor, multi: true },
    AuthService
  ]
};
