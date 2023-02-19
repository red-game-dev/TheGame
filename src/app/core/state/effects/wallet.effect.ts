import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { fetchWallet, fetchWalletSuccess, updateWalletSuccess } from '@actions/wallet.actions';
import { GET_WALLET, GET_WALLET_SUBSCRIPTION } from '../../queries/wallet';
import { Apollo } from 'apollo-angular'
import { of } from 'rxjs';
import { fetchFailed } from '@actions/errors.actions';
import { Wallet } from '@models/wallet';

interface QueryResponseWallet {
  currentUser: {
    wallets: {
      id: string;
      amount: number;
      currency: string;
      name: string;
    }[];
  }
}

interface SubscribeResponseWallet {
  wallet: Wallet;
}

@Injectable()
export class WalletEffects {
  constructor(private actions$: Actions, private apollo: Apollo) {}

  getWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWallet),
      switchMap(() =>
        this.apollo.watchQuery<QueryResponseWallet>({
            query: GET_WALLET,
          })
          .valueChanges
          .pipe(
              map((result) => fetchWalletSuccess({ payload: result.data?.currentUser?.wallets })),
              catchError((error) => of(fetchFailed({ payload: error })))
            )
      )
    ),
  );

  subscribeWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWallet),
      mergeMap(() =>
        this.apollo.subscribe<SubscribeResponseWallet>({
          query: GET_WALLET_SUBSCRIPTION
        }).pipe(
          map(result => updateWalletSuccess({ payload: result.data?.wallet || {} as Wallet })),
          catchError((error) => of(fetchFailed({ payload: error })))
        )
      )
  ));
}
