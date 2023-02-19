import { createReducer, on } from '@ngrx/store';
import { fetchUser, fetchUserSuccess } from '@actions/user.actions';
import { userAdapter } from '@state/user.state';

export const initialState = userAdapter.getInitialState({
  loading: false,
});

export const userReducer = createReducer(
  initialState,
  on(fetchUser, (state) => ({ ...state, loading: true })),
  on(fetchUserSuccess, (state, { payload }) => userAdapter.addOne(payload, { ...state, loading: false })),
);
