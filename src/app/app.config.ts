import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), importProvidersFrom(LucideAngularModule.pick(icons))]
};
