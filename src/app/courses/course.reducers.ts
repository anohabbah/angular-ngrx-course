import {Course} from './model/course';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {CourseActions, CourseActionTypes} from './course.actions';

// tslint:disable-next-line:no-empty-interface
export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

// tslint:disable-next-line:no-empty-interface
// export interface LessonsState  extends EntityState<Lesson> {}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState = adapter.getInitialState({ allCoursesLoaded: false });

export function coursesReducer(state: CoursesState = initialCoursesState, action: CourseActions): CoursesState {
  switch (action.type) {
    case CourseActionTypes.CourseLoaded:
      return adapter.addOne(action.payload.course, state);

    case CourseActionTypes.AllCoursesLoaded:
      return adapter.addAll(action.payload.courses, { ...state, allCoursesLoaded: true });

    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
