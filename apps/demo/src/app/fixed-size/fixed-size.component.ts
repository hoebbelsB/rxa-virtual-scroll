import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FixedSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/template/experimental/virtual-scrolling';

import { DataService } from '../data.service';

@Component({
  selector: 'fixed-size',
  template: `
    <h3>Fixed Size Strategy</h3>
    <ng-container *ngIf="state.showViewport">
      <demo-panel
        #demoPanel
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="(state.items$ | async).length"
        [renderedItemsAmount]="state.renderedItems$ | async"
        [scrolledIndex]="viewport.scrolledIndexChange | async"
        [(runwayItems)]="state.runwayItems"
        [(runwayItemsOpposite)]="state.runwayItemsOpposite"
        [(viewCache)]="state.viewCache"
      ></demo-panel>
      <div class="demo-list">
        <rx-virtual-scroll-viewport
          #viewport
          [runwayItemsOpposite]="state.runwayItemsOpposite"
          [runwayItems]="state.runwayItems"
          [itemSize]="50"
        >
          <div
            class="item"
            *rxVirtualFor="
              let item of state.dataService.items;
              renderCallback: state.renderCallback$;
              templateCacheSize: state.viewCache;
              strategy: demoPanel.strategyChange
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
      .demo-list {
        flex: 1;
        max-width: 960px;
        width: 100%;
        box-sizing: border-box;
      }
      .demo-panel {
        max-width: 960px;
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
  providers: [DataService, DemoComponentState],
})
export class FixedSizeComponent {
  constructor(public state: DemoComponentState) {}
}

import { NgModule } from '@angular/core';

import { DemoComponentState } from '../demo-component.state';
import { DemoPanelModule } from '../demo-panel/demo-panel.component';

@NgModule({
  imports: [
    RxVirtualScrollViewportComponent,
    RxVirtualFor,
    FixedSizeVirtualScrollStrategy,
    CommonModule,
    RouterModule.forChild([{ path: '', component: FixedSizeComponent }]),
    DemoPanelModule,
  ],
  exports: [],
  declarations: [FixedSizeComponent],
  providers: [],
})
export class FixedSizeModule {}
