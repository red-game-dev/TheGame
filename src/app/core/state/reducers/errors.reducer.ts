import { createReducer, on } from '@ngrx/store';
import { fetchFailed } from '../actions/errors.actions';
import { fetchFailedAdapter } from '../errors.state';

export const initialState = fetchFailedAdapter.getInitialState({});

export const fetchErrorsReducer = createReducer(
  initialState,
  on(fetchFailed, (state, action) => fetchFailedAdapter.addMany(action.payload, state)),
);
