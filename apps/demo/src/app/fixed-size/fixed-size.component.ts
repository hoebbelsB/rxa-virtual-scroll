import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  NgZone,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FixedSizeVirtualScrollStrategyModule,
  RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS,
  RxVirtualScrollDefaultOptions,
  RxVirtualScrollingModule,
} from '@rx-angular/virtual-scrolling';
import { Subject } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'fixed-size',
  template: `
    <h3>Fixed Size Demo</h3>
    <ng-container *ngIf="showViewport">
      <demo-panel
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="(items$ | async).length"
        [renderedItemsAmount]="renderedItems$ | async"
        [scrolledIndex]="viewport.scrolledIndexChange | async"
        [(runwayItems)]="runwayItems"
        [(runwayItemsOpposite)]="runwayItemsOpposite"
        [(viewCache)]="viewCache"
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
              renderCallback: renderCallback$;
              viewCacheSize: viewCache
            "
          >
            <div>{{ item.id }}</div>
            <div class="item__content">{{ item.content }}</div>
            <div>{{ item.status }}</div>
            <div class="item__date">{{ item.date | date }}</div>
          </div>
        </rx-virtual-scroll-viewport>
      </div>
    </ng-container>
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
      .item__content {
        white-space: nowrap;
        text-overflow: ellipsis;
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

  runwayItems = this.defaults.runwayItems;
  runwayItemsOpposite = this.defaults.runwayItemsOpposite;

  showViewport = true;

  private _viewCache = this.defaults.viewCacheSize;
  get viewCache() {
    return this._viewCache as number;
  }
  set viewCache(cache: number) {
    this._viewCache = cache;
    this.showViewport = false;
    this.cdRef.detectChanges();
    Promise.resolve().then(() => {
      this.showViewport = true;
      this.cdRef.markForCheck();
    });
  }
  constructor(
    public dataService: DataService,
    private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    @Inject(RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS)
    private defaults: RxVirtualScrollDefaultOptions
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
