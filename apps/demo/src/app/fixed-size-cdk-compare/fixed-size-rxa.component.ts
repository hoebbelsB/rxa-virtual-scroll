import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FixedSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/template/virtual-scrolling';

import { DemoComponentState } from '../demo-component.state';
import { DemoPanelComponent } from '../demo-panel/demo-panel.component';

@Component({
  selector: 'fixed-size-rxa',
  template: `
    <div>
      <h3>Fixed Size Strategy</h3>
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
          [itemSize]="50"
          #viewport
        >
          <div
            class="item"
            *rxVirtualFor="
              let item of state.items$;
              strategy: demoPanel.strategyChange$;
              templateCacheSize: state.viewCache;
              renderCallback: state.renderCallback$
            "
          >
            <div>{{ item.id }}</div>
            <div class="item__content">{{ item.content }}</div>
            <div>{{ item.status }}</div>
            <div class="item__date">{{ item.date | date }}</div>
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
    RxVirtualFor,
    FixedSizeVirtualScrollStrategy,
    RxVirtualScrollViewportComponent,
    DatePipe,
    AsyncPipe,
    DemoPanelComponent,
  ],
  providers: [DemoComponentState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixedSizeRxaComponent {
  state = inject(DemoComponentState);
}
