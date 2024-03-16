import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withHashLocation()), importProvidersFrom(LucideAngularModule.pick(icons))]
};
