import {Injectable} from "@angular/core";
import {BehaviorSubject, concatMap, finalize, Observable, of, tap} from "rxjs";

@Injectable()
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  setLoadingUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.setLoading()),
      concatMap(() => obs$),
      finalize(() => this.resetLoading())
    )
  }

  setLoading() {
    this.loadingSubject.next(true)
  }

  resetLoading() {
    this.loadingSubject.next(false)
  }
}
