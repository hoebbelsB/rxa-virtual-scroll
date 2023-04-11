import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DataService } from '../data.service';
import { DemoPanelModule } from '../demo-panel/demo-panel.component';
import { DynamicSizeCdkModule } from './dynamic-size-cdk.component';
import { DynamicSizeRxaModule } from './dynamic-size-rxa.component';

@Component({
  selector: 'dynamic-size-cdk-compare',
  template: `
    <div>
      <h3>RxAngular Dynamic Size Strategy vs CDK Autosize Strategy</h3>
    </div>
    <div class="demo-content">
      <dynamic-size-rxa></dynamic-size-rxa>
      <dynamic-size-cdk></dynamic-size-cdk>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .demo-content {
        display: flex;
        flex: 1;
      }
      .demo-content > * {
        flex-basis: 50%;
        box-sizing: border-box;
        padding: 0.5rem;
      }
      .list-with-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        max-width: 960px;
        padding: 0.25rem;
        box-sizing: border-box;
      }
      .demo-panel {
        margin-bottom: 1rem;
      }
      .item:hover {
        height: 230px !important;
      }
    `,
  ],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSizeCdkCompareComponent {}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DynamicSizeCdkCompareComponent },
    ]),
    FormsModule,
    DemoPanelModule,
    DynamicSizeCdkModule,
    DynamicSizeRxaModule,
  ],
  exports: [],
  declarations: [DynamicSizeCdkCompareComponent],
  providers: [],
})
export class DynamicSizeCdkCompareModule {}
