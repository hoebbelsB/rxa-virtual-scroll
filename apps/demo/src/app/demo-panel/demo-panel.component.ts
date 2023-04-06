import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DataService } from '../data.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'demo-panel',
  template: `
    <div>
      <div><strong>Stats</strong></div>
      <table>
        <tr>
          <td>Items in list</td>
          <td>{{ itemAmount }}</td>
        </tr>
        <tr>
          <td>Rendered items</td>
          <td>{{ renderedItemsAmount }}</td>
        </tr>
        <tr>
          <td>ScrolledIndex</td>
          <td>{{ scrolledIndex }}</td>
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
              [ngModel]="runwayItems"
              (ngModelChange)="runwayItemsChange.next($event)"
              type="number"
              step="1"
              min="0"
            />
          </td>
        </tr>
        <tr>
          <td>Runway items opposite</td>
          <td>
            <input
              [ngModel]="runwayItemsOpposite"
              (ngModelChange)="runwayItemsOppositeChange.next($event)"
              type="number"
              min="0"
              step="1"
            />
          </td>
        </tr>
        <tr>
          <td>
            Scroll To
            <span
              title="This is probably not working correctly and should not be used in production"
              *ngIf="scrollToExperimental"
              >⚠️</span
            >
          </td>
          <td>
            <input type="number" min="0" step="1" #scrollToInput />
            <button (click)="scrollToIndex.emit(scrollToInput.valueAsNumber)">
              Scroll
            </button>
          </td>
        </tr>
      </table>
    </div>
  `,
  host: {
    class: 'demo-panel',
  },
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      input {
        width: 75px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoPanelComponent {
  @Input() scrollToExperimental = false;
  @Input() itemAmount = 0;
  @Input() renderedItemsAmount = 0;
  @Input() scrolledIndex = 0;
  @Output() scrollToIndex = new EventEmitter<number>();
  @Input() runwayItemsOpposite = 5;
  @Output() runwayItemsOppositeChange = new EventEmitter<number>();
  @Input() runwayItems = 20;
  @Output() runwayItemsChange = new EventEmitter<number>();

  constructor(public dataService: DataService) {}
}

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [DemoPanelComponent],
  declarations: [DemoPanelComponent],
  providers: [],
})
export class DemoPanelModule {}
