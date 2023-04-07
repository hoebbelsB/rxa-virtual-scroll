import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FixedSizeVirtualScrollStrategyModule,
  RxVirtualScrollingModule,
} from '@rx-angular/virtual-scrolling';
import { Subject } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'fixed-size',
  template: `
    <h3>Fixed Size Demo</h3>
    <demo-panel
      (scrollToIndex)="viewport.scrollToIndex($event)"
      [itemAmount]="(items$ | async).length"
      [renderedItemsAmount]="renderedItems$ | async"
      [scrolledIndex]="viewport.scrolledIndexChange | async"
      [(runwayItems)]="runwayItems"
      [(runwayItemsOpposite)]="runwayItemsOpposite"
    ></demo-panel>
    <div style="flex: 1; max-width: 600px;">
      <rx-virtual-scroll-viewport
        #viewport
        [runwayItemsOpposite]="runwayItemsOpposite"
        [runwayItems]="runwayItems"
        [itemSize]="50"
      >
        <div
          class="item"
          *rxVirtualFor="
            let item of dataService.items;
            renderCallback: renderCallback$
          "
        >
          <div>{{ item.id }}</div>
          <div class="item__content">{{ item.content }}</div>
          <div>{{ item.status }}</div>
          <div class="item__date">{{ item.date | date }}</div>
        </div>
      </rx-virtual-scroll-viewport>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .item {
        height: 50px;
        overflow: hidden;
      }
    `,
  ],
  providers: [DataService],
})
export class FixedSizeComponent {
  readonly renderCallback$ = new Subject<any>();

  renderedItems$: Subject<number> = new Subject<number>();

  items$ = this.dataService.items$;

  runwayItems = 20;
  runwayItemsOpposite = 5;
  constructor(
    public dataService: DataService,
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {
    this.renderCallback$.subscribe(() => {
      this.ngZone.run(() =>
        this.renderedItems$.next(
          this.elementRef.nativeElement.querySelectorAll('.item').length
        )
      );
    });
  }
}

import { NgModule } from '@angular/core';
import { DemoPanelModule } from '../demo-panel/demo-panel.component';

@NgModule({
  imports: [
    RxVirtualScrollingModule,
    FixedSizeVirtualScrollStrategyModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: FixedSizeComponent }]),
    DemoPanelModule,
  ],
  exports: [],
  declarations: [FixedSizeComponent],
  providers: [],
})
export class FixedSizeModule {}
