import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'rx-virtual-scroll-root',
  template: `
    <div class="nav" [class.nav--open]="navOpen">
      <h2>RxAngular Virtual Scrolling</h2>
      <h3>Demos</h3>
      <a
        class="nav-item"
        [routerLink]="['demos/fixed-size']"
        [routerLinkActive]="'active'"
        >Fixed Size</a
      >
      <a
        class="nav-item"
        [routerLink]="['demos/dynamic-size']"
        [routerLinkActive]="'active'"
        >Dynamic Size</a
      >
      <a
        class="nav-item"
        [routerLink]="['demos/autosize']"
        [routerLinkActive]="'active'"
        >Autosize</a
      >
      <h3>CDK Comparison</h3>
      <a
        class="nav-item"
        [routerLink]="['demos/fixed-size-cdk-compare']"
        [routerLinkActive]="'active'"
        >Fixed Size</a
      >
      <a
        class="nav-item"
        [routerLink]="['demos/dynamic-size-cdk-compare']"
        [routerLinkActive]="'active'"
        >Dynamic Size</a
      >
      <a
        class="nav-item"
        [routerLink]="['demos/autosize-cdk-compare']"
        [routerLinkActive]="'active'"
        >Autosize</a
      >
      <a
        class="nav-item docs-link"
        target="_blank"
        href="https://github.com/rx-angular/rx-angular/blob/feat/virtual-scrolling/apps/docs/docs/template/api/virtual-scrolling.md"
      >
        🖺 Docs
      </a>
    </div>
    <div class="content" (mousedown)="closeNavIfOpen($event)">
      <button
        class="nav-toggle"
        (click)="$event.stopPropagation(); navOpen = !navOpen"
      >
        ☰
      </button>
      <router-outlet></router-outlet>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'virtual-scroll-root',
  },
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navOpen = false;

  constructor(private router: Router) {
    matchMedia('(max-width: 600px)').addEventListener(
      'change',
      (e: MediaQueryListEvent) => {
        if (e.matches) {
          this.navOpen = false;
        }
      }
    );
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.navOpen = false;
      }
    });
  }

  closeNavIfOpen(event: MouseEvent) {
    if (this.navOpen) {
      event.stopPropagation();
      event.preventDefault();
      this.navOpen = false;
    }
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'demos/fixed-size',
          loadChildren: () =>
            import('./fixed-size/fixed-size.component').then(
              (m) => m.FixedSizeModule
            ),
        },
        {
          path: 'demos/fixed-size-cdk-compare',
          loadChildren: () =>
            import(
              './fixed-size-cdk-compare/fixed-size-cdk-compare.component'
            ).then((m) => m.FixedSizeCdkCompareModule),
        },
        {
          path: 'demos/dynamic-size',
          loadChildren: () =>
            import('./dynamic-size/dynamic-size.component').then(
              (m) => m.DynamicSizeModule
            ),
        },
        {
          path: 'demos/dynamic-size-cdk-compare',
          loadChildren: () =>
            import(
              './dynamic-size-cdk-compare/dynamic-size-cdk-compare.component'
            ).then((m) => m.DynamicSizeCdkCompareModule),
        },
        {
          path: 'demos/autosize',
          loadChildren: () =>
            import('./auto-size/autosize.component').then(
              (m) => m.AutosizeModule
            ),
        },
        {
          path: 'demos/autosize-cdk-compare',
          loadChildren: () =>
            import(
              './auto-size-cdk-compare/autosize-cdk-compare.component'
            ).then((m) => m.AutosizeCdkCompareModule),
        },
        {
          path: '',
          redirectTo: 'demos/fixed-size',
          pathMatch: 'full',
        },
      ],
      {
        useHash: true,
      }
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
