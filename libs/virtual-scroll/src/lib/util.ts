import {
  cancelAnimationFrame,
  Promise,
  requestAnimationFrame,
} from '@rx-angular/cdk/zone-less/browser';
import { from, Observable } from 'rxjs';

export function unpatchedAnimationFrameTick(): Observable<void> {
  return new Observable<void>((observer) => {
    const tick = requestAnimationFrame(() => {
      observer.next();
    });
    return () => {
      cancelAnimationFrame(tick);
    };
  });
}

export function unpatchedMicroTask(): Observable<void> {
  return from(Promise.resolve());
}

export function getZoneUnPatchedApi<T extends object, N extends keyof T>(
  targetOrName: T,
  name: N
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return targetOrName['__zone_symbol__' + name] || targetOrName[name];
}
