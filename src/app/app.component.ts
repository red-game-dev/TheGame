import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular'
import { User } from './core/models/user';
import { Wallet } from './core/models/wallet';
import { fetchUser } from './core/state/actions/user.actions';
import { fetchWallet } from './core/state/actions/wallet.actions';
import { getUser } from './core/state/selectors/user.selectors';
import { getBalance, getCurrencySymbol, getWallet } from './core/state/selectors/wallet.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  wallet$ = this.store.select(getWallet)
  balance$ = this.store.select(getBalance)
  currencySymbol$ = this.store.select(getCurrencySymbol)
  user$ = this.store.select(getUser);

  constructor(private apollo: Apollo, private store: Store<User | Wallet>) {}

  ngOnInit(): void {
    this.store.dispatch(fetchWallet());

    this.store.dispatch(fetchUser());
  }

  addToCart(item: any) {
  }

  get currentYear() {
    return new Date().getFullYear();
  }

}
