import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';
import { fetchBoxes } from '../../core/state/actions/boxes.actions';
import { getBoxes } from '../../core/state/selectors/boxes.selectors';
import { Router } from '@angular/router';
import { getCurrencySymbol } from 'src/app/core/state/selectors/wallet.selectors';
import { Box } from 'src/app/core/models/box';
import { Wallet } from 'src/app/core/models/wallet';

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
