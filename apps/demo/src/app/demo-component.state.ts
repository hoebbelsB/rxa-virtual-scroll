import {
  ChangeDetectorRef,
  ElementRef,
  Inject,
  Injectable,
  NgZone,
} from '@angular/core';
import {
  RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS,
  RxVirtualScrollDefaultOptions,
} from '@rx-angular/virtual-scrolling';
import { Subject } from 'rxjs';

import { DataService } from './data.service';

@Injectable()
export class DemoComponentState {
  readonly renderCallback$ = new Subject<any>();

  renderedItems$: Subject<number> = new Subject<number>();

  items$ = this.dataService.items$;

  runwayItems = this.defaults.runwayItems;
  runwayItemsOpposite = this.defaults.runwayItemsOpposite;

  showViewport = true;

  private _viewCache = this.defaults.viewCacheSize;
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

  constructor(
    public dataService: DataService,
    private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    @Inject(RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS)
    private defaults: RxVirtualScrollDefaultOptions
  ) {
    this.renderCallback$.subscribe(() => {
      this.ngZone.run(() =>
        this.renderedItems$.next(
          this.elementRef.nativeElement.querySelectorAll('.item').length
        )
      );
    });
  }
}
