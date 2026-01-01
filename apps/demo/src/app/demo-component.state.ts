import {
  ChangeDetectorRef,
  ElementRef,
  inject,
  Injectable,
  NgZone,
} from '@angular/core';
import { RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS } from '@rx-angular/template/virtual-scrolling';
import { Subject } from 'rxjs';

import { DataService } from './data.service';

@Injectable()
export class DemoComponentState {
  public dataService = inject(DataService);
  private cdRef = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef<HTMLElement>);
  private ngZone = inject(NgZone);
  private defaults = inject(RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS);

  readonly renderCallback$ = new Subject<any>();

  renderedItems$: Subject<number> = new Subject<number>();

  items$ = this.dataService.items$;
  items = this.dataService.items;

  runwayItems = this.defaults.runwayItems;
  runwayItemsOpposite = this.defaults.runwayItemsOpposite;

  showViewport = true;

  private _viewCache = this.defaults.templateCacheSize;
  get viewCache() {
    return this._viewCache as number;
  }
  set viewCache(cache: number) {
    this._viewCache = cache;
    this.showViewport = false;
    this.cdRef.detectChanges();
    Promise.resolve().then(() => {
      this.showViewport = true;
      this.cdRef.markForCheck();
    });
  }

  constructor() {
    this.renderCallback$.subscribe(() => {
      this.ngZone.run(() =>
        this.renderedItems$.next(
          this.elementRef.nativeElement.querySelectorAll('.item').length,
        ),
      );
    });
  }
}
