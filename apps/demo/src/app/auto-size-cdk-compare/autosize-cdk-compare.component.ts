import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DataService } from '../data.service';
import { DemoPanelModule } from '../demo-panel/demo-panel.component';
import { AutosizeCdkModule } from './autosize-cdk.component';
import { AutosizeRxaModule } from './autosize-rxa.component';

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
})
export class AutosizeCdkCompareComponent {}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AutosizeCdkCompareComponent },
    ]),
    FormsModule,
    DemoPanelModule,
    AutosizeCdkModule,
    AutosizeRxaModule,
  ],
  exports: [],
  declarations: [AutosizeCdkCompareComponent],
  providers: [],
})
export class AutosizeCdkCompareModule {}
