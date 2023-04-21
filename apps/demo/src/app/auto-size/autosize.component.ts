import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AutoSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollViewportComponent,
} from '@rx-angular/virtual-scrolling';

import { DataService } from '../data.service';

@Component({
  selector: 'auto-size',
  template: `
    <div>
      <h3>Autosize Strategy</h3>
    </div>
    <ng-container *ngIf="state.showViewport">
      <demo-panel
        #demoPanel
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="(state.items$ | async).length"
        [renderedItemsAmount]="state.renderedItems$ | async"
        [scrolledIndex]="viewport.scrolledIndexChange | async"
        [withStableScrollbar]="true"
        [(stableScrollbar)]="stableScrollbar"
        [(runwayItems)]="state.runwayItems"
        [(runwayItemsOpposite)]="state.runwayItemsOpposite"
        [(viewCache)]="state.viewCache"
      ></demo-panel>
      <div class="demo-list">
        <rx-virtual-scroll-viewport
          [runwayItems]="state.runwayItems"
          [runwayItemsOpposite]="state.runwayItemsOpposite"
          [withSyncScrollbar]="stableScrollbar"
          autosize
          #viewport
        >
          <div
            class="item"
            *rxVirtualFor="
              let item of state.items$;
              viewCacheSize: state.viewCache;
              renderCallback: state.renderCallback$;
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
      .item:hover {
        height: 230px !important;
      }
    `,
  ],
  providers: [DataService, DemoComponentState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutosizeComponent {
  stableScrollbar = true;
  constructor(public state: DemoComponentState) {}
}

import { NgModule } from '@angular/core';

import { DemoComponentState } from '../demo-component.state';
import { DemoPanelModule } from '../demo-panel/demo-panel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AutosizeComponent }]),
    FormsModule,
    DemoPanelModule,
    RxVirtualFor,
    AutoSizeVirtualScrollStrategy,
    RxVirtualScrollViewportComponent,
  ],
  exports: [],
  declarations: [AutosizeComponent],
  providers: [],
})
export class AutosizeModule {}
