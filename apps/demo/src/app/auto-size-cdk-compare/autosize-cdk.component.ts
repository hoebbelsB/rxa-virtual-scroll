import {
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { CdkAutoSizeVirtualScroll } from '@angular/cdk-experimental/scrolling';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DemoComponentState } from '../demo-component.state';
import { DemoPanelComponent } from '../demo-panel/demo-panel.component';

@Component({
  selector: 'auto-size-cdk',
  template: `
    <div>
      <h3>@angular/cdk Autosize Strategy</h3>
    </div>
    @if (state.showViewport) {
      <demo-panel
        [withStrategy]="false"
        [scrollToExperimental]="true"
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="state.items().length"
        [renderedItemsAmount]="state.renderedItems$ | async"
        [(runwayItems)]="state.runwayItems"
        [(runwayItemsOpposite)]="state.runwayItemsOpposite"
        [(viewCache)]="state.viewCache"
      ></demo-panel>
      <div class="demo-list">
        <cdk-virtual-scroll-viewport autosize #viewport style="height: 100%">
          <div
            class="item"
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
      .item:hover {
        height: 230px !important;
      }
    `,
  ],
  providers: [DemoComponentState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DemoPanelComponent,
    AsyncPipe,
    CdkVirtualScrollViewport,
    CdkAutoSizeVirtualScroll,
    CdkVirtualForOf,
    DatePipe,
  ],
})
export class AutosizeCdkComponent {
  state = inject(DemoComponentState);
}
