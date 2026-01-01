import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DataService } from '../data.service';
import { AutosizeCdkComponent } from './autosize-cdk.component';
import { AutosizeRxaComponent } from './autosize-rxa.component';

@Component({
  selector: 'auto-size-cdk-compare',
  template: `
    <div>
      <h3>RxAngular Autosize Strategy vs CDK Autosize Strategy</h3>
    </div>
    <div class="demo-content">
      <auto-size-rxa></auto-size-rxa>
      <auto-size-cdk></auto-size-cdk>
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
  imports: [AutosizeRxaComponent, AutosizeCdkComponent],
})
export class AutosizeCdkCompareComponent {}
