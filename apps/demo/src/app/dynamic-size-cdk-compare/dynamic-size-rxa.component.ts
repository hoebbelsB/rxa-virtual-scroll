import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  DynamicSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/template/virtual-scrolling';

import { Item } from '../data.service';
import { DemoComponentState } from '../demo-component.state';
import { DemoPanelComponent } from '../demo-panel/demo-panel.component';

@Component({
  selector: 'dynamic-size-rxa',
  template: `
    <div>
      <h3>Dynamic Size Strategy</h3>
    </div>
    @if (state.showViewport) {
      <demo-panel
        #demoPanel
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="state.items().length"
        [renderedItemsAmount]="state.renderedItems$ | async"
        [scrolledIndex]="viewport.scrolledIndexChange | async"
        [(runwayItems)]="state.runwayItems"
        [(runwayItemsOpposite)]="state.runwayItemsOpposite"
        [(viewCache)]="state.viewCache"
      ></demo-panel>
      <div class="demo-list">
        <rx-virtual-scroll-viewport
          [runwayItems]="state.runwayItems"
          [runwayItemsOpposite]="state.runwayItemsOpposite"
          [dynamic]="itemSize"
          #viewport
        >
          <div
            class="item"
            [style.height.px]="itemSize(item)"
            *rxVirtualFor="
              let item of state.items$;
              renderCallback: state.renderCallback$;
              templateCacheSize: state.viewCache;
              strategy: demoPanel.strategyChange$
            "
          >
            <div>{{ item.id }}</div>
            <div class="item__content">{{ item.content }}</div>
            <div>{{ item.status }}</div>
            <div class="item__date">{{ item.date | date }}</div>
            @if (item.description) {
              <div class="item__description">
                <div><strong>Long Description:</strong></div>
                <div>{{ item.description }}</div>
              </div>
            }
          </div>
        </rx-virtual-scroll-viewport>
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
      .item__description {
        height: 70px;
        grid-area: desc;
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
    RxVirtualFor,
    DynamicSizeVirtualScrollStrategy,
    RxVirtualScrollViewportComponent,
    DatePipe,
    AsyncPipe,
    DemoPanelComponent,
  ],
  providers: [DemoComponentState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSizeRxaComponent {
  itemSize = (item: Item) => (item.description ? 120 : 50);
  state = inject(DemoComponentState);
}
