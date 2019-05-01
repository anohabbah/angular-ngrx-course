import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoursesState} from './course.reducers';
import * as fromCourse from './course.reducers';
import {Course} from './model/course';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectCourseById = (courseId: number) => createSelector(
  selectCoursesState,
  (coursesState: CoursesState) => coursesState.entities[courseId]
);

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourse.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.filter((course: Course) => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.filter((course: Course) => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.filter((course: Course) => course.promo).length
);

export const allCoursesLoaded = createSelector(
  selectCoursesState,
  (coursesState: CoursesState) => coursesState.allCoursesLoaded
);
