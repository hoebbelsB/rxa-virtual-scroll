import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  viewChildren,
} from '@angular/core';

import { DemoComponentState } from '../demo-component.state';
import { DemoPanelComponent } from '../demo-panel/demo-panel.component';

@Component({
  selector: 'fixed-size-cdk',
  template: `
    <div>
      <h3>@angular/cdk Fixed Size Strategy</h3>
    </div>
    @if (state.showViewport) {
      <demo-panel
        [withStrategy]="false"
        [scrolledIndex]="viewport.scrolledIndexChange | async"
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="state.items().length"
        [renderedItemsAmount]="renderedItems()"
        [(runwayItems)]="state.runwayItems"
        [(runwayItemsOpposite)]="state.runwayItemsOpposite"
        [(viewCache)]="state.viewCache"
      ></demo-panel>
      <div class="demo-list">
        <cdk-virtual-scroll-viewport
          [itemSize]="50"
          #viewport
          style="height: 100%"
        >
          <div
            class="item"
            #item
            *cdkVirtualFor="
              let item of state.items$;
              templateCacheSize: state.viewCache
            "
          >
            <div>{{ item.id }}</div>
            <div class="item__content">{{ item.content }}</div>
            <div>{{ item.status }}</div>
            <div class="item__date">{{ item.date | date }}</div>
          </div>
        </cdk-virtual-scroll-viewport>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .demo-list {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
      }
      .demo-panel {
        width: 100%;
        margin-bottom: 1rem;
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
  imports: [
    DatePipe,
    AsyncPipe,
    DemoPanelComponent,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
  ],
  providers: [DemoComponentState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixedSizeCdkComponent {
  readonly items = viewChildren<ElementRef<HTMLElement>>('item');

  renderedItems = computed(() => this.items().length);
  state = inject(DemoComponentState);
}
