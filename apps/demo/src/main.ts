import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      [
        {
          path: 'demos/fixed-size',
          loadComponent: () =>
            import('./app/fixed-size/fixed-size.component').then(
              (m) => m.FixedSizeComponent,
            ),
        },
        {
          path: 'demos/fixed-size-cdk-compare',
          loadComponent: () =>
            import('./app/fixed-size-cdk-compare/fixed-size-cdk-compare.component').then(
              (m) => m.FixedSizeCdkCompareComponent,
            ),
        },
        {
          path: 'demos/dynamic-size',
          loadComponent: () =>
            import('./app/dynamic-size/dynamic-size.component').then(
              (m) => m.DynamicSizeComponent,
            ),
        },
        {
          path: 'demos/dynamic-size-cdk-compare',
          loadComponent: () =>
            import('./app/dynamic-size-cdk-compare/dynamic-size-cdk-compare.component').then(
              (m) => m.DynamicSizeCdkCompareComponent,
            ),
        },
        {
          path: 'demos/autosize',
          loadComponent: () =>
            import('./app/auto-size/autosize.component').then(
              (m) => m.AutosizeComponent,
            ),
        },
        {
          path: 'demos/autosize-cdk-compare',
          loadComponent: () =>
            import('./app/auto-size-cdk-compare/autosize-cdk-compare.component').then(
              (m) => m.AutosizeCdkCompareComponent,
            ),
        },
        {
          path: '',
          redirectTo: 'demos/fixed-size',
          pathMatch: 'full',
        },
      ],
      withHashLocation(),
    ),
  ],
}).catch((err) => console.error(err));
