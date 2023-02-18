import { RouterReducerState } from '@ngrx/router-store'

export interface RootState {
  router: RouterReducerState<any>;
}

export const initialState: RootState = {
  router: {
    state: { url: '/', params: {}, queryParams: {} },
    navigationId: 0,
  },
};
