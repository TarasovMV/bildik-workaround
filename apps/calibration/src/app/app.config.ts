import { TuiRootModule } from '@taiga-ui/core';
import type { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import {
    provideRouter,
    withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
        importProvidersFrom(TuiRootModule, BrowserAnimationsModule),
    ],
};
