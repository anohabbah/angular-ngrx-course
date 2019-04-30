import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

//
// interface CoursesState {
//   courses: Course[];
// }
//
// interface LessonsState {
//   lessons: Lesson[];
// }

export interface AppState {
}

export const reducers: ActionReducerMap<AppState> = {
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
