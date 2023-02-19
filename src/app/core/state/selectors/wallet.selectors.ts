import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Wallet } from '@models/wallet';
import { walletAdapter, WalletState } from '@state/wallet.state';

export const selectWalletState = createFeatureSelector<WalletState>('wallet');

export const getWallet = createSelector(
  selectWalletState,
  walletAdapter.getSelectors().selectAll,
);

export const getBalance = createSelector(
  getWallet,
  (wallets: Wallet[]) => {
    const index = wallets.findIndex(({ name }: Wallet) => name === "MAIN");

    if (index > -1) {
      return wallets[index].amount;
    }

    return 0
  }
)

export const getCurrencySymbol = createSelector(
  getWallet,
  (wallets: Wallet[]) => {
    const index = wallets.findIndex(({ name }: Wallet) => name === "MAIN");

    if (index > -1) {
      return wallets[index].currency;
    }

    return ""
  }
)

export const isWalletLoading = createSelector(
  selectWalletState,
  (state: WalletState) => state.loading
);
