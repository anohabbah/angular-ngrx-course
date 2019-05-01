import { Action } from '@ngrx/store';
import {Course} from './model/course';

export enum CourseActionTypes {
  LoadCourses = '[Courses] Load Courses',
  CourseRequested = '[View Course page] Course Requested',
  CourseLoaded = '[Courses API] Course Loaded',
}

export class LoadCourses implements Action {
  readonly type = CourseActionTypes.LoadCourses;
}

export class CourseRequested implements Action {
  readonly type = CourseActionTypes.CourseRequested;

  constructor(public payload: { courseId: number }) {}
}

export class CourseLoaded implements Action {
  readonly type = CourseActionTypes.CourseLoaded;

  constructor(public payload: { course: Course }) {}
}

export type CourseActions = LoadCourses | CourseLoaded | CourseRequested;
