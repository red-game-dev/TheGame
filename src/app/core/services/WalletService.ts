import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { WalletEffects } from '../state/effects/wallet.effect';

@Injectable({
  providedIn: 'root'
})
export class WalletSubscriptionService {
  constructor(private store: Store, private walletEffects$: WalletEffects) {}

  subscribeToWallets() {
    this.walletEffects$.subscribeWallet$.subscribe(this.store.dispatch);
  }
}
