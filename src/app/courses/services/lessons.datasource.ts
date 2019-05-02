import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Lesson} from '../model/lesson';
import {catchError, finalize, tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {LessonsPageRequested, PageQuery} from '../course.actions';
import {selectLessonsPage} from '../course.selectors';

export class LessonsDataSource implements DataSource<Lesson> {

  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

  constructor(private store: Store<AppState>) {}

  loadLessons(courseId: number, page: PageQuery) {

    this.store
      .pipe(
        select(selectLessonsPage(courseId, page)),
        tap((lessons: Lesson[]) => {
          if (lessons.length) {
            this.lessonsSubject.next(lessons);
          } else {
            this.store.dispatch(new LessonsPageRequested({courseId, page}));
          }
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    console.log('Connecting data source');
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete();
  }
}
