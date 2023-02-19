import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map, switchMap } from 'rxjs/operators';
import { fetchBoxes, fetchBoxesSuccess, openBox, OpenBoxPayload, openBoxSuccess } from '@actions/boxes.actions';
import { GET_BOXES, OPEN_BOX_MUTATION } from '../../queries/boxes';
import { Apollo } from 'apollo-angular'
import { fetchFailed } from '@actions/errors.actions';
import { fetchWallet } from '@actions/wallet.actions';
import { of } from 'rxjs';
import { Box, OpenedBox } from '@models/box';

interface QueryResponseBoxes {
  boxes: {
    edges: {
      node: Box
    }[];
  }
}

interface QueryResponseOpenedBoxes {
  openBox: {
    boxOpenings: OpenedBox[]
  }
}

@Injectable()
export class BoxesEffects {
  constructor(private actions$: Actions, private apollo: Apollo) {}

  getBoxes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchBoxes),
      map((action) => action.payload),
      switchMap(() =>
        this.apollo.query<QueryResponseBoxes>({
            query: GET_BOXES(),
          })
          .pipe(
              map((result) => fetchBoxesSuccess({ payload: result.data?.boxes?.edges?.map(({ node }) => node) || [] })),
              catchError((error) => of(fetchFailed({ payload: error })))
            )
      )
    ),
  );

  openBox$ = createEffect(() => this.actions$.pipe(
    ofType(openBox),
    map((action) => action.payload),
    switchMap((payload: OpenBoxPayload) => this.apollo.mutate<QueryResponseOpenedBoxes>({
      mutation: OPEN_BOX_MUTATION,
      variables: {
        input: {
          boxId: payload.boxId,
          amount: payload.amount
        }
      }
    }).pipe(
      mergeMap(result => [
        fetchWallet(),
        openBoxSuccess({ payload: result.data?.openBox.boxOpenings || []  as OpenedBox[] }),
      ]),
      catchError((error) => of(fetchFailed({ payload: error })))
    ))
  ));
}
