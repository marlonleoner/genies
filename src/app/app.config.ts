import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withHashLocation()),
        provideHttpClient(),
        importProvidersFrom(LucideAngularModule.pick(icons))
    ]
};
