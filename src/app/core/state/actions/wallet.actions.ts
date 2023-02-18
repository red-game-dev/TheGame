import { createAction, props } from '@ngrx/store';
import { Wallet } from '../../models/wallet';

export const fetchWallet = createAction('[Wallet] Get Wallet');

export const fetchWalletSuccess = createAction('[Wallet] Get Wallet Success', props<{ payload: Wallet[] }>());

export const updateWalletSuccess = createAction('[Wallet] Update Wallet Success', props<{ payload: Wallet }>());
