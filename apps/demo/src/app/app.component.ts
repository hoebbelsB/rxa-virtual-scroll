import { Component, inject, ViewEncapsulation } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

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
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {
  navOpen = false;
  #router = inject(Router);

  constructor() {
    matchMedia('(max-width: 600px)').addEventListener(
      'change',
      (e: MediaQueryListEvent) => {
        if (e.matches) {
          this.navOpen = false;
        }
      },
    );
    this.#router.events.subscribe((e) => {
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
