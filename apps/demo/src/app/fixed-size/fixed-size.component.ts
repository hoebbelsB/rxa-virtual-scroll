import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FixedSizeVirtualScrollStrategyModule,
  RxVirtualScrollingModule,
} from '@rx-angular/virtual-scrolling';

import { DataService } from '../data.service';

@Component({
  selector: 'fixed-size',
  template: `
    <h3>Fixed Size Strategy</h3>
    <ng-container *ngIf="state.showViewport">
      <demo-panel
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="(state.items$ | async).length"
        [renderedItemsAmount]="state.renderedItems$ | async"
        [scrolledIndex]="viewport.scrolledIndexChange | async"
        [(runwayItems)]="state.runwayItems"
        [(runwayItemsOpposite)]="state.runwayItemsOpposite"
        [(viewCache)]="state.viewCache"
      ></demo-panel>
      <div style="flex: 1; max-width: 600px;">
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
              viewCacheSize: state.viewCache
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
