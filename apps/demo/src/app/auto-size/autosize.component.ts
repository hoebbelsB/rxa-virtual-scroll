import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AutosizeVirtualScrollStrategyModule,
  RxVirtualScrollingModule,
} from '@rx-angular/virtual-scrolling';
import { DataService } from '../data.service';

@Component({
  selector: 'auto-size',
  template: `
    <div>
      <h3>Autosize Demo</h3>
    </div>
    <ng-container *ngIf="state.showViewport">
      <demo-panel
        [scrollToExperimental]="true"
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
          [runwayItems]="state.runwayItems"
          [runwayItemsOpposite]="state.runwayItemsOpposite"
          autosize
          #viewport
        >
          <div
            class="item"
            *rxVirtualFor="
              let item of state.items$;
              viewCacheSize: state.viewCache;
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
  providers: [DataService, DemoComponentState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutosizeComponent {
  constructor(public state: DemoComponentState) {}
}

import { NgModule } from '@angular/core';
import { DemoPanelModule } from '../demo-panel/demo-panel.component';
import { DemoComponentState } from '../demo-component.state';

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
