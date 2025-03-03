import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {CUSTOM_DATE_TIME_FORMATS, CustomDateTimeAdapter} from './date-adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideAnimationsAsync(),
    provideRouter(routes), {
    provide: DateAdapter,
    useExisting: CustomDateTimeAdapter,
  }, {
    provide: MAT_DATE_FORMATS,
    useValue: CUSTOM_DATE_TIME_FORMATS,
  },]
};
