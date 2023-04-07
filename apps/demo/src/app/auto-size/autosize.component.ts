import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AutosizeVirtualScrollStrategyModule,
  RxVirtualScrollingModule,
} from '@rx-angular/virtual-scrolling';
import { Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'auto-size',
  template: `
    <div>
      <h3>Autosize Demo</h3>
    </div>
    <ng-container *ngIf="showViewport">
      <demo-panel
        [scrollToExperimental]="true"
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
          [runwayItems]="runwayItems"
          [runwayItemsOpposite]="runwayItemsOpposite"
          autosize
          #viewport
        >
          <div
            class="item"
            *rxVirtualFor="
              let item of items$;
              viewCacheSize: viewCache;
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
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .demo-panel {
        margin-bottom: 1rem;
      }
      .item:hover {
        height: 230px !important;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataService],
})
export class AutosizeComponent {
  readonly renderCallback$ = new Subject<any>();

  renderedItems$: Subject<number> = new Subject<number>();

  items$ = this.dataService.items$;

  runwayItems = 20;
  runwayItemsOpposite = 5;
  showViewport = true;

  private _viewCache = 50;
  get viewCache() {
    return this._viewCache;
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
    CommonModule,
    AutosizeVirtualScrollStrategyModule,
    RouterModule.forChild([{ path: '', component: AutosizeComponent }]),
    FormsModule,
    DemoPanelModule,
  ],
  exports: [],
  declarations: [AutosizeComponent],
  providers: [],
})
export class AutosizeModule {}
