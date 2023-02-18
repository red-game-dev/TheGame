import { createReducer, on } from '@ngrx/store';
import { fetchWallet, fetchWalletSuccess, updateWalletSuccess } from '../actions/wallet.actions';
import { walletAdapter } from '../wallet.state';

export const initialState = walletAdapter.getInitialState({
  loading: false,
});

export const walletReducer = createReducer(
  initialState,
  on(fetchWallet, (state) => ({ ...state, loading: true })),
  on(fetchWalletSuccess, (state, { payload }) => walletAdapter.upsertMany(payload, ({ ...state, loading: false }))),
  on(updateWalletSuccess, (state, { payload }) => walletAdapter.updateOne({
    id: payload.id,
    changes: payload
  }, ({ ...state, loading: false })))
);
