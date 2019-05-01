import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CourseActionTypes, CourseLoaded, CourseRequested} from './course.actions';
import {Observable, of} from 'rxjs';
import {CoursesService} from './services/courses.service';
import {map, mergeMap} from 'rxjs/operators';
import {Course} from './model/course';

@Injectable()
export class CourseEffects {
  @Effect()
  loadCourse$: Observable<CourseLoaded> = this.actions$
    .pipe(
      ofType<CourseRequested>(CourseActionTypes.CourseRequested),
      mergeMap((action: CourseRequested) => {
        console.log(action);
        return this.coursesService.findCourseById(action.payload.courseId);
      }),
      map((course: Course) => new CourseLoaded({course}))
    );

  constructor(private actions$: Actions, private coursesService: CoursesService) {}
}
