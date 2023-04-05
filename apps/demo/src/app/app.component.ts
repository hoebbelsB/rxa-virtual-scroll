import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FixedSizeVirtualScrollStrategyModule,
  RxVirtualScrollingModule,
} from '@rx-angular/virtual-scrolling';

@Component({
  selector: 'rx-virtual-scroll-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  items = new Array(20).fill(0).map((v, i) => ({
    id: i,
    value: `value ${i}`,
  }));

  trackItem = (i: number, item: { id: number }) => item.id;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RxVirtualScrollingModule,
    FixedSizeVirtualScrollStrategyModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
