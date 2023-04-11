import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DataService } from '../data.service';
import { DemoPanelModule } from '../demo-panel/demo-panel.component';
import { FixedSizeCdkModule } from './fixed-size-cdk.component';
import { AutosizeRxaModule } from './fixed-size-rxa.component';

@Component({
  selector: 'fixed-size-cdk-compare',
  template: `
    <div>
      <h3>RxAngular Fixed Size Strategy vs CDK Fixed Size Strategy</h3>
    </div>
    <div class="demo-content">
      <fixed-size-rxa></fixed-size-rxa>
      <fixed-size-cdk></fixed-size-cdk>
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
export class FixedSizeCdkCompareComponent {}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: FixedSizeCdkCompareComponent },
    ]),
    FormsModule,
    DemoPanelModule,
    FixedSizeCdkModule,
    AutosizeRxaModule,
  ],
  exports: [],
  declarations: [FixedSizeCdkCompareComponent],
  providers: [],
})
export class FixedSizeCdkCompareModule {}
