import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AllCoursesLoaded,
  AllCoursesRequested,
  CourseActionTypes,
  CourseLoaded,
  CourseRequested,
  LessonsPageCancelled,
  LessonsPageLoaded,
  LessonsPageRequested
} from './course.actions';
import {Observable, of} from 'rxjs';
import {CoursesService} from './services/courses.service';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {Course} from './model/course';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {allCoursesLoaded} from './course.selectors';
import {Lesson} from './model/lesson';

@Injectable()
export class CourseEffects {
  @Effect()
  loadCourse$: Observable<CourseLoaded> = this.actions$
    .pipe(
      ofType<CourseRequested>(CourseActionTypes.CourseRequested),
      mergeMap((action: CourseRequested) => {
        return this.coursesService.findCourseById(action.payload.courseId);
      }),
      map((course: Course) => new CourseLoaded({course}))
    );

  @Effect()
  loadAllCourses$: Observable<AllCoursesLoaded> = this.actions$
    .pipe(
      ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
      withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
      filter(([action, coursesLoaded]) => !coursesLoaded),
      mergeMap(() => this.coursesService.findAllCourses()),
      map((courses: Course[]) => new AllCoursesLoaded({courses}))
    );

  @Effect()
  loadLessonsPage$: Observable<LessonsPageLoaded> = this.actions$
    .pipe(
      ofType<LessonsPageRequested>(CourseActionTypes.LessonsPageRequested),
      mergeMap(({payload: {courseId, page}}) =>
        this.coursesService
          .findLessons(courseId, page.pageIndex, page.pageSize)
          .pipe(
            catchError((err: Error) => {
              console.log('Error occurred when loading lessons page', err);

              this.store.dispatch(new LessonsPageCancelled());

              return of([]);
            })
          )),
      map((lessons: Lesson[]) => new LessonsPageLoaded({lessons}))
    );

  constructor(private actions$: Actions, private coursesService: CoursesService, private store: Store<AppState>) {}
}
