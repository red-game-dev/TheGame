import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fetchUser, fetchUserSuccess } from '@actions/user.actions';
import { GET_USER } from '../../queries/user';
import { Apollo } from 'apollo-angular'
import { of } from 'rxjs';
import { fetchFailed } from '@actions/errors.actions';
import { User } from '@models/user';

interface QueryResponseUser {
  currentUser: {
    id: string;
    name: string;
  }
}

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private apollo: Apollo) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUser),
      switchMap(() =>
        this.apollo.query<QueryResponseUser>({
            query: GET_USER,
          })
          .pipe(
              map((result) => fetchUserSuccess({ payload: result.data?.currentUser || {}  as User })),
              catchError((error) => of(fetchFailed({ payload: error })))
            )
      )
    ),
  );
}
