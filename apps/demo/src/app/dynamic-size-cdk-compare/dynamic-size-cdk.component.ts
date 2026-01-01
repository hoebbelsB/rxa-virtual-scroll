import {
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { CdkAutoSizeVirtualScroll } from '@angular/cdk-experimental/scrolling';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Item } from '../data.service';
import { DemoComponentState } from '../demo-component.state';
import { DemoPanelComponent } from '../demo-panel/demo-panel.component';

@Component({
  selector: 'dynamic-size-cdk',
  template: `
    <div>
      <h3>@angular/cdk Autosize Strategy</h3>
    </div>
    @if (state.showViewport) {
      <demo-panel
        [withStrategy]="false"
        [scrollToExperimental]="true"
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="(state.items$ | async).length"
        [renderedItemsAmount]="state.renderedItems$ | async"
        [(runwayItems)]="state.runwayItems"
        [(runwayItemsOpposite)]="state.runwayItemsOpposite"
        [(viewCache)]="state.viewCache"
      ></demo-panel>
      <div class="demo-list">
        <cdk-virtual-scroll-viewport autosize #viewport style="height: 100%">
          <div
            class="item"
            [style.height.px]="itemSize(item)"
            *cdkVirtualFor="
              let item of state.items$;
              templateCacheSize: state.viewCache
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
    DatePipe,
    AsyncPipe,
    DemoPanelComponent,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    CdkAutoSizeVirtualScroll
],
  providers: [DemoComponentState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSizeCdkComponent {
  itemSize = (item: Item) => (item.description ? 120 : 50);
  state = inject(DemoComponentState);
}
