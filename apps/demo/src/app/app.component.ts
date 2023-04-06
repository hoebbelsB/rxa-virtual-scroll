import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'rx-virtual-scroll-root',
  template: `
    <div class="nav">
      <a
        class="nav-item"
        [routerLink]="['demos/fixed-size']"
        [routerLinkActive]="'active'"
        >Fixed size</a
      >
      <a
        class="nav-item"
        [routerLink]="['demos/autosize']"
        [routerLinkActive]="'active'"
        >Autosize</a
      >
    </div>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'virtual-scroll-root',
  },
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'demos/fixed-size',
        loadChildren: () =>
          import('./fixed-size/fixed-size.component').then(
            (m) => m.FixedSizeModule
          ),
      },
      {
        path: 'demos/autosize',
        loadChildren: () =>
          import('./auto-size/autosize.component').then(
            (m) => m.AutosizeModule
          ),
      },
      {
        path: '',
        redirectTo: 'demos/fixed-size',
        pathMatch: 'full',
      },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
