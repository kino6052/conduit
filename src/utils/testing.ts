import { Observable, Subject, filter, lastValueFrom, take } from "rxjs";

export function checkEventual<T extends {}>(
  predicate: (result: T) => boolean,
  observable: Observable<T>,
) {
  return lastValueFrom(observable.pipe(filter(predicate), take(1)));
}
