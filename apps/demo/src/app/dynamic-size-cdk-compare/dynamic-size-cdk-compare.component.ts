import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DataService } from '../data.service';
import { DynamicSizeCdkComponent } from './dynamic-size-cdk.component';
import { DynamicSizeRxaComponent } from './dynamic-size-rxa.component';

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
  imports: [DynamicSizeRxaComponent, DynamicSizeCdkComponent],
})
export class DynamicSizeCdkCompareComponent {}
