import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular'
import { fetchBoxes } from '../../core/state/actions/boxes.actions';
import { getBoxes } from '../../core/state/selectors/boxes.selectors';
import { Router } from '@angular/router';
import { getCurrencySymbol, getWallet } from 'src/app/core/state/selectors/wallet.selectors';
import { Box } from 'src/app/core/models/box';
import { Wallet } from 'src/app/core/models/wallet';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  boxes$ = this.store.select(getBoxes);
  wallet$ = this.store.select(getWallet);
  currencySymbol$ = this.store.select(getCurrencySymbol)

  constructor(private apollo: Apollo, private store: Store<Box | Wallet>, private router: Router) {}

  navigateToBox(id: string) {
    this.router.navigate(['box', id]);
  }

  ngOnInit(): void {
    this.currencySymbol$ = this.store.select(getCurrencySymbol)
    this.store.dispatch(fetchBoxes({
      payload: {
        free: false,
        purchasable: true,
        openable: true
      }
    }));
  }
}
