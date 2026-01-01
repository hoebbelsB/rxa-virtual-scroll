import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';

import { DataService } from '../data.service';

@Component({
  selector: 'demo-panel',
  template: `
    <details #details>
      <summary>Input & Stats</summary>

      <div class="demo-panel__body">
        <div>
          <div><strong>Stats</strong></div>
          <table>
            <tr>
              <td>Items in list</td>
              <td>{{ itemAmount() }}</td>
            </tr>
            <tr>
              <td>Rendered items</td>
              <td>{{ renderedItemsAmount() }}</td>
            </tr>
            <tr>
              <td>ScrolledIndex</td>
              <td>{{ scrolledIndex() }}</td>
            </tr>
          </table>
        </div>
        <div>
          <div><strong>Inputs</strong></div>
          <table>
            <tr>
              <td>Add Items</td>
              <td>
                <input
                  #addAmountInput
                  value="100"
                  type="number"
                  step="50"
                  max="1000"
                />
                <button
                  (click)="dataService.addItems(addAmountInput.valueAsNumber)"
                >
                  Add
                </button>
              </td>
            </tr>
            <tr>
              <td>Runway items</td>
              <td>
                <input
                  [ngModel]="runwayItems()"
                  (ngModelChange)="runwayItemsChange.emit($event)"
                  type="number"
                  step="1"
                  min="0"
                />
              </td>
            </tr>
            <tr>
              <td>Runway opposite items</td>
              <td>
                <input
                  [ngModel]="runwayItemsOpposite()"
                  (ngModelChange)="runwayItemsOppositeChange.emit($event)"
                  type="number"
                  min="0"
                  step="1"
                />
              </td>
            </tr>
            <tr>
              <td>viewCache</td>
              <td>
                <input
                  [ngModel]="viewCache()"
                  [ngModelOptions]="{ updateOn: 'blur' }"
                  (ngModelChange)="viewCacheChange.emit($event)"
                  type="number"
                  min="0"
                  step="1"
                />
              </td>
            </tr>
            <tr>
              <td>
                Scroll To
                @if (scrollToExperimental()) {
                  <span
                    title="This is probably not working correctly and should not be used in production"
                    >⚠️</span
                  >
                }
              </td>
              <td>
                <input type="number" min="0" step="1" #scrollToInput />
                <button
                  (click)="scrollToIndex.emit(scrollToInput.valueAsNumber)"
                >
                  Scroll
                </button>
              </td>
            </tr>
            @if (withStableScrollbar()) {
              <tr>
                <td>
                  With Stable Scrollbar
                  <span
                    title="This is can cause very weird effects based on the contents you are rendering. If your views are of similar size and do not change massively, you can safely use it as it increases the UX."
                    >💡️</span
                  >
                </td>
                <td>
                  <input
                    type="checkbox"
                    (change)="
                      stableScrollbarChange.emit(stableScrollbarInput.checked)
                    "
                    [checked]="stableScrollbar()"
                    #stableScrollbarInput
                  />
                </td>
              </tr>
            }
            @if (withStrategy()) {
              <tr>
                <td>Render Strategy</td>
                <td>
                  <select
                    [ngModel]="strategy"
                    (ngModelChange)="strategyChange.emit($event)"
                  >
                    <option value="native">Native (sync)</option>
                    <option value="immediate">Immediate</option>
                    <option value="userBlocking">User Blocking</option>
                    <option value="normal">Normal</option>
                  </select>
                </td>
              </tr>
            }
          </table>
        </div>
      </div>
    </details>
  `,
  host: {
    class: 'demo-panel',
  },
  styles: [
    `
      summary {
        margin-bottom: 0.5rem;
      }
      details {
        padding: 0.25rem;
        border: 1px solid lightgray;
      }
      .demo-panel__body {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      td button {
        margin-left: 0.5rem;
      }

      input {
        width: 75px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
})
export class DemoPanelComponent {
  readonly scrollToExperimental = input(false);
  readonly withStrategy = input(true);
  readonly itemAmount = input(0);
  readonly renderedItemsAmount = input(0);
  readonly withStableScrollbar = input(false);
  readonly stableScrollbar = input(false);
  readonly stableScrollbarChange = output<boolean>();
  readonly scrolledIndex = input(0);
  readonly scrollToIndex = output<number>();
  readonly runwayItemsOpposite = input(5);
  readonly runwayItemsOppositeChange = output<number>();
  readonly viewCache = input(50);
  readonly viewCacheChange = output<number>();
  readonly runwayItems = input(20);
  readonly runwayItemsChange = output<number>();

  readonly strategyChange = output<string>();

  dataService = inject(DataService);

  private strategyProvider = inject(RxStrategyProvider);

  strategy = this.strategyProvider.primaryStrategy;
}
