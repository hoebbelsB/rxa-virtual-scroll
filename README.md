# RxVirtualScroll

A **high performance** alternative to [`@angular/cdk/scrolling`](https://material.angular.io/cdk/scrolling/) virtual scrolling implementation.

Instead of rendering every item provided, `rxVirtualFor` only renders what is currently visible to the user, thus providing
excellent runtime performance for huge sets of data.

The technique to render items is comparable to the one used by twitter and
explained in very much detail by @DasSurma in his blog post about the
[complexities of infinite scrollers](https://developer.chrome.com/blog/infinite-scroller/).

"Each recycling of a DOM element would normally relayout the entire runway which would bring us well below our target
of 60 frames per second. To avoid this, we are taking the burden of layout onto ourselves and use absolutely positioned
elements with transforms." (@DasSurma)

## Usage

 ```html
<rx-virtual-scroll-viewport>
  <div
   [itemSize]="50"
   *rxVirtualFor="let hero of heroes$;">
    <div>
      <div><strong>{{ hero.name }}</strong></div>
      <div> {{ hero.id }}</div>
      <div> {{ hero.description }}</div>
    </div>
  </div>
</rx-virtual-scroll-viewport>
 ```

## Demo

Check out the [Demo Application](https://hoebbelsb.github.io/rxa-virtual-scroll/). You can play around with
all pre-packaged ScrollStrategies as well as control the majority of inputs.

## Features

**DX Features**

- reduces boilerplate (multiple `async` pipe's)
- a unified/structured way of handling `null` and `undefined`
- works also with static variables `*rxVirtualFor="let i of []"`
- Immutable as well as mutable data structures (`trackBy`)
- Notify when rendering of templates is finished (`renderCallback`)

**Performance Features**

- lazy template creation (done by [Render Strategies](https://www.rx-angular.io/docs/cdk/render-strategies))
- non-blocking rendering of lists [Concurrent Strategies](https://www.rx-angular.io/docs/cdk/render-strategies/strategies/concurrent-strategies)
- configurable frame budget (defaults to 60 FPS)
- Super efficient layouting with css transformations
- Define a viewCache in order to re-use views instead of re-creating them
- triggers change-detection on `EmbeddedView` level
- Zone-agnostic, opt-out of `NgZone` with `patchZone`
- 3 Configurable `RxVirtualScrollStrategy` providing the core logic to calculate the viewRange and position DOM
    Nodes
  - `FixedSizeVirtualScrollStrategy`
  - `AutosizeVirtualScrollStrategy`
  - `DynamicSizeVirtualScrollStrategy`


# Docs

The `@rx-angular-addons/virtual-scrolling` package can be seen as a high performant competitor of the
official `@angular/cdk/scrolling`.
The API is heavily inspired by `@angular/cdk/scrolling` and is divided into multiple
core components which have to be glued together:

* `RxVirtualViewRepeater`, implemented by `RxVirtualFor`
* `RxVirtualScrollViewport`, implemented by `RxVirtualScrollViewportComponent`
* `RxVirtualScrollStrategy`, implemented by `AutosizeVirtualScrollStrategy`, `FixedSizeVirtualScrollStrategy` & `DynamicSizeVirtualScrollStrategy`

## API

### RxVirtualFor

The `*rxVirtualFor` structural directive implements the `RxVirtualViewRepeater` and is responsible to create actual views
from the bound data.

#### Inputs

| Input             | Type                                                               | description                                                                                                                                                                                                                                                                                                                                        |
|-------------------|--------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `trackBy`         | `keyof T` or `(index: number, item: T) => any`                     | Identifier function for items. `rxVirtualFor` provides a shorthand where you can name the property directly.                                                                                                                                                                                                                                       |
| `patchZone`       | `boolean`                                                          | _default: `true`_ if set to `false`, the `RxVirtualForDirective` will operate out of `NgZone`. See [NgZone optimizations](https://www.rx-angular.io/docs/template/performance-issues/ngzone-optimizations)                                                                                                                                         |
| `parent`          | `boolean`                                                          | _default: `true`_ if set to `false`, the `RxVirtualForDirective` won't inform its host component about changes being made to the template. More performant, `@ViewChild` and `@ContentChild` queries won't work. [Handling view and content queries](https://www.rx-angular.io/docs/template/performance-issues/handling-view-and-content-queries) |
| `strategy`        | `Observable<RxStrategyNames \ string> \ RxStrategyNames \ string>` | _default: `normal`_ configure the `RxStrategyRenderStrategy` used to detect changes.                                                                                                                                                                                                                                                               |
| `renderCallback`  | `Subject<U>`                                                       | giving the developer the exact timing when the `RxVirtualForDirective` created, updated, removed its template. Useful for situations where you need to know when rendering is done.                                                                                                                                                                |
| `viewCacheSize`   | `number`                                                           | _default: `20`_ Controls the amount if views held in cache for later re-use when a user is scrolling the list If this is set to 0, `rxVirtualFor` won't cache any view, thus destroying & re-creating very often on scroll events.                                                                                                                 |


#### Context Variables

The following context variables are available for each template:

**Static Context Variables (mirrored from `ngFor`)**

| Variable Name | Type      | description                                          |
|---------------|-----------|------------------------------------------------------|
| `$implicit`   | `T`       | the default variable accessed by `let val`           |
| `index`       | `number`  | current index of the item                            |
| `count`       | `number`  | count of all items in the list                       |
| `first`       | `boolean` | true if the item is the first in the list            |
| `last`        | `boolean` | true if the item is the last in the list             |
| `even`        | `boolean` | true if the item has on even index (index % 2 === 0) |
| `odd`         | `boolean` | the opposite of even                                 |

**Reactive Context Variables**

| Variable Name | Type                                                           | description                                                                                                                                                                                                       |
|---------------|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `item$`       | `Observable<T>`                                                | the same value as $implicit, but as `Observable`                                                                                                                                                                  |
| `index$`      | `Observable<number>`                                           | index as `Observable`                                                                                                                                                                                             |
| `count$`      | `Observable<number>`                                           | count as `Observable`                                                                                                                                                                                             |
| `first$`      | `Observable<boolean>`                                          | first as `Observable`                                                                                                                                                                                             |
| `last$`       | `Observable<boolean>`                                          | last as `Observable`                                                                                                                                                                                              |
| `even$`       | `Observable<boolean>`                                          | even as `Observable`                                                                                                                                                                                              |
| `odd$`        | `Observable<boolean>`                                          | odd as `Observable`                                                                                                                                                                                               |
| `select`      | `(keys: (keyof T)[], distinctByMap) => Observable<Partial<T>>` | returns a selection function which accepts an array of properties to pluck out of every list item. The function returns the selected properties of the current list item as distinct `Observable` key-value-pair. |

**Use the context variables**

```html
<rx-virtual-scroll-viewport [itemSize]="50">
 <div
    *rxVirtualFor="
      let item of observableItems$;
      let count = count;
      let index = index;
      let first = first;
      let last = last;
      let even = even;
      let odd = odd;
      trackBy: trackItem;
    "
  >
    <div>{{ count }}</div>
    <div>{{ index }}</div>
    <div>{{ item }}</div>
    <div>{{ first }}</div>
    <div>{{ last }}</div>
    <div>{{ even }}</div>
    <div>{{ odd }}</div>
  </div>
</rx-virtual-scroll-viewport>
```

### RxVirtualScrollViewportComponent

Container component comparable to CdkVirtualScrollViewport acting as viewport for `*rxVirtualFor` to operate on.
Its main purpose is to implement the `RxVirtualScrollViewport` interface as well as maintaining the scroll runways'
height in order to give the provided `RxVirtualScrollStrategy` room to position items. Furthermore, it will gather and forward
all events to the consumer of `rxVirtualFor`.

#### Outputs

| Output                | Type                                         | description                                                                                                                                                                                                                                                                                                                                                     |
|-----------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `viewRange`           | `ListRange: { start: number; end: number; }` | The range to be rendered by `*rxVirtualFor`. This value is determined by the provided `RxVirtualScrollStrategy`. It gives the user information about the range of items being actually rendered to the DOM. Note this value updates before the `renderCallback` kicks in, thus it is only in sync with the DOM when the next `renderCallback` emitted an event. |
| `scrolledIndexChange` | `number`                                     | The index of the currently scrolled item. The scrolled item is the topmost item actually being visible to the user.                                                                                                                                                                                                                                             |

### RxVirtualScrollStrategy

The `RxVirtualScrollStrategy` is responsible for positioning the created views on the viewport.
The three pre-packaged scroll strategies share similar concepts for layouting views.
All of them provide a twitter-like virtual-scrolling implementation, where views are positioned absolutely and transitioned by
using css `transforms`.
They also share two inputs to define the amount of views to actually render on the screen.

| Input                 | Type     | description                                                                      |
|-----------------------|----------|----------------------------------------------------------------------------------|
| `runwayItems`         | `number` | _default: `10`_ The amount of items to render upfront in scroll direction        |
| `runwayItemsOpposite` | `number` | _default: `2`_ The amount of items to render upfront in reverse scroll direction |


#### FixedSizeVirtualScrollStrategy

The `FixedSizeVirtualScrollStrategy` positions views based on a fixed size per item. It is comparable to `@angular/cdk/scrolling` `FixedSizeVirtualScrollStrategy`,
but with a high performant layouting technique.

[Demo](https://hoebbelsb.github.io/rxa-virtual-scroll/demos/fixed-size)

The default size can be configured directly as `@Input('itemSize')`.

**Example**

```html
<rx-virtual-scroll-viewport
  [itemSize]="50"
>
  <div
    class="item"
    *rxVirtualFor="let item of items$;"
  >
    <div>{{ item.id }}</div>
    <div>{{ item.content }}</div>
    <div>{{ item.status }}</div>
    <div>{{ item.date | date }}</div>
  </div>
</rx-virtual-scroll-viewport>
```

#### AutosizeVirtualScrollStrategy

The `AutosizeVirtualScrollStrategy` is able to render and position
items based on their individual size. It is comparable to `@angular/cdk/experimental` `AutosizeVirtualScrollStrategy`, but with
a high performant layouting technique and better visual stability.
Furthermore, the `AutosizeVirtualScrollStrategy` is leveraging the `ResizeObserver` in order to detect size changes for each individual
view rendered to the DOM and properly re-position accordingly.

For views it doesn't know yet, the `AutosizeVirtualScrollStrategy` anticipates a certain size in order to properly size the runway.
The size is determined by the `@Input('tombstoneSize')` and defaults to `50`.

In order to provide top runtime performance the `AutosizeVirtualScrollStrategy` builds up caches that
prevent DOM interactions whenever possible. Once a view was visited, its properties will be stored instead of re-read from the DOM
again as this can potentially lead to unwanted forced reflows.

[Demo](https://hoebbelsb.github.io/rxa-virtual-scroll/demos/autosize)

**Example**

```html
<rx-virtual-scroll-viewport autosize>
  <div
    class="item"
    *rxVirtualFor="let item of items$;"
  >
    <div>{{ item.id }}</div>
    <div>{{ item.content }}</div>
    <div>{{ item.status }}</div>
    <div>{{ item.date | date }}</div>
  </div>
</rx-virtual-scroll-viewport>
```

#### DynamicSizeVirtualScrollStrategy

The `DynamicSizeVirtualScrollStrategy` is very similar to the `AutosizeVirtualScrollStrategy`. Instead of pulling the size for each view, it calculates the size
based on a user provided function of type `(item: T) => number`. Because it doesn't have to interact with the DOM in order to position views,
the `DynamicSizeVirtualScrollStrategy` has a better runtime performance compared to the `AutosizeVirtualScrollStrategy`.

[Demo](https://hoebbelsb.github.io/rxa-virtual-scroll/demos/dynamic-size)

**Example**

```ts
// items with a description have 120px height, others only 50px
dynamicSize = (item: Item) => (item.description ? 120 : 50);
```

```html
<rx-virtual-scroll-viewport
  [dynamic]="dynamicSize"
>
  <div
    class="item"
    *rxVirtualFor="let item of items$;"
  >
    <div>{{ item.id }}</div>
    <div>{{ item.content }}</div>
    <div>{{ item.status }}</div>
    <div>{{ item.date | date }}</div>
    <div *ngIf="item.description">{{ item.description }}</div>
  </div>
</rx-virtual-scroll-viewport>
```


### Configuration

#### RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS

By providing a `RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS` token, you can pre-configure default settings for 
the directives of the `@rx-angular-addons/virtual-scrolling` package.

```ts
import { RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS } from '@rx-angular-addons/virtual-scrolling';

@NgModule({
  providers: [{
      provide: RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS,
      useValue: { // should be of type `RxVirtualScrollDefaultOptions`
        runwayItems: 50,
        // turn off cache by default
        viewCacheSize: 0
      }
  }]
})
```

#### Default Values

```ts
/* determines how many templates can be cached and re-used on rendering */
const DEFAULT_VIEW_CACHE_SIZE = 20;
/* determines how many views will be rendered in scroll direction */
const DEFAULT_ITEM_SIZE = 50;
/* determines how many views will be rendered in the opposite scroll direction */
const DEFAULT_RUNWAY_ITEMS = 10;
/* default item size to be used for scroll strategies. Used as tombstone size for the autosized strategy */
const DEFAULT_RUNWAY_ITEMS_OPPOSITE = 2;
```

#### RxVirtualScrollDefaultOptions

```ts
export interface RxVirtualScrollDefaultOptions {
  /* determines how many templates can be cached and re-used on rendering, defaults to 20 */
  viewCacheSize?: number;
  /* determines how many views will be rendered in scroll direction, defaults to 15 */
  runwayItems?: number;
  /* determines how many views will be rendered in the opposite scroll direction, defaults to 5 */
  runwayItemsOpposite?: number;
  /* default item size to be used for scroll strategies. Used as tombstone size for the autosized strategy */
  itemSize?: number;
}
```
