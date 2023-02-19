import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';
import { fetchBoxes } from '@actions/boxes.actions';
import { getBoxes } from '@selectors/boxes.selectors';
import { Router } from '@angular/router';
import { getCurrencySymbol } from '@selectors/wallet.selectors';
import { Box } from '@models/box';
import { Wallet } from '@models/wallet';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent implements OnInit {
  boxes$ = this.store.select(getBoxes);
  currencySymbol$ = this.store.select(getCurrencySymbol)

  constructor(private store: Store<Box | Wallet>, private router: Router) {}

  /**
   * Navigate to the box detailed page
   * @param {string} id The boxId to navigate with
   */
  navigateToBox(id: string) {
    this.router.navigate(['box', id]);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchBoxes({
      payload: {
        free: false,
        purchasable: true,
        openable: true
      }
    }));
  }
}
