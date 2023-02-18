import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const fetchUser = createAction('[User] Get User');

export const fetchUserSuccess = createAction('[User] Get User Success', props<{ payload: User }>());
