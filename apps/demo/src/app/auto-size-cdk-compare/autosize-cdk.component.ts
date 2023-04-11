import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrolling } from '@angular/cdk-experimental/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'auto-size-cdk',
  template: `
    <div>
      <h3>@angular/cdk Autosize Strategy</h3>
    </div>
    <ng-container *ngIf="state.showViewport">
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
})
export class AutosizeCdkComponent {
  constructor(public state: DemoComponentState) {}
}

import { NgModule } from '@angular/core';

import { DemoComponentState } from '../demo-component.state';
import { DemoPanelModule } from '../demo-panel/demo-panel.component';

@NgModule({
  imports: [
    ScrollingModule,
    ExperimentalScrolling,
    CommonModule,
    FormsModule,
    DemoPanelModule,
    ScrollingModule,
  ],
  exports: [AutosizeCdkComponent],
  declarations: [AutosizeCdkComponent],
  providers: [],
})
export class AutosizeCdkModule {}
