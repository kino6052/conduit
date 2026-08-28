import { Observable, filter, lastValueFrom, take } from "rxjs";

export function checkEventual<T extends Record<string, unknown>>(
  predicate: (result: T | undefined) => boolean,
  observable: Observable<T | undefined>,
) {
  return lastValueFrom(observable.pipe(filter(predicate), take(1)));
}
