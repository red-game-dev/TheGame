import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { WalletEffects } from '../state/effects/wallet.effect';

@Injectable({
  providedIn: 'root'
})
export class WalletSubscriptionService {
  walletSubscription$: Subscription = new Subscription();

  constructor(private apollo: Apollo, private store: Store, private walletEffects$: WalletEffects) {}

  subscribeToWallets() {
    this.walletSubscription$ = this.walletEffects$.subscribeWallet$.subscribe(action => {
      this.store.dispatch(action);
    });
  }
}
