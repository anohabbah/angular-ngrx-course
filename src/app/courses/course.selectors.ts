import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoursesState} from './course.reducers';
import * as fromCourse from './course.reducers';
import * as fromLesson from './lessons.reducer';
import {Course} from './model/course';
import {PageQuery} from './course.actions';
import {LessonsState} from './lessons.reducer';
import {Lesson} from './model/lesson';

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


export const selectLessonsState = createFeatureSelector<LessonsState>('lessons');

export const selectAllLessons = createSelector(
  selectLessonsState,
  fromLesson.selectAll
);

export const selectLessonsPage = (courseId: number, page: PageQuery) => createSelector(
  selectAllLessons,
  (lessons: Lesson[]) => {
    const start = page.pageIndex * page.pageSize,
      end = start + page.pageSize;

    return lessons
      .filter((lesson: Lesson) => lesson.courseId === courseId)
      .slice(start, end);
  }
);

export const selectLessonsLoading = createSelector(
  selectLessonsState,
  (state: LessonsState) => state.loading
);
