import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fixed-size-cdk',
  template: `
    <div>
      <h3>@angular/cdk Fixed Size Strategy</h3>
    </div>
    <ng-container *ngIf="state.showViewport">
      <demo-panel
        [withStrategy]="false"
        [scrolledIndex]="viewport.scrolledIndexChange | async"
        (scrollToIndex)="viewport.scrollToIndex($event)"
        [itemAmount]="(state.items$ | async).length"
        [renderedItemsAmount]="renderedItems$ | async"
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
  providers: [DemoComponentState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixedSizeCdkComponent {
  @ViewChildren('item') items!: QueryList<ElementRef<HTMLElement>>;

  renderedItems$ = defer(() =>
    from(Promise.resolve()).pipe(
      switchMap(() =>
        this.items.changes.pipe(
          startWith(null),
          map(() => this.items.length)
        )
      )
    )
  );
  constructor(public state: DemoComponentState) {}
}

import { NgModule } from '@angular/core';
import { defer, from } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { DemoComponentState } from '../demo-component.state';
import { DemoPanelModule } from '../demo-panel/demo-panel.component';

@NgModule({
  imports: [
    ScrollingModule,
    CommonModule,
    FormsModule,
    DemoPanelModule,
    ScrollingModule,
  ],
  exports: [FixedSizeCdkComponent],
  declarations: [FixedSizeCdkComponent],
  providers: [],
})
export class FixedSizeCdkModule {}
