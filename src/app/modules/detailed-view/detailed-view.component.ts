import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fetchBoxes, openBox } from '@actions/boxes.actions';
import { getDetailViewBox, isBoxOpening } from '@selectors/boxes.selectors';
import { getCurrencySymbol } from '@selectors/wallet.selectors';
import { Box } from '@models/box';
import { Wallet } from '@models/wallet';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('giftBoxOpen', [
      state('open', style({
        transform: 'rotate(-10deg)'
      })),
      transition('* => open', [
        animate('0.5s', style({
          transform: 'rotate(10deg)'
        })),
        animate('0.5s', style({
          transform: 'rotate(0deg)'
        }))
      ]),
    ]),
    trigger('obtainedWinnings', [
      state('open', style({
        transform: 'rotate(-10deg)'
      })),
      transition('* => open', [
        animate('0.5s', style({
          transform: 'rotate(10deg)'
        })),
        animate('0.5s', style({
          transform: 'rotate(0deg)'
        }))
      ]),
      transition('open => *', [
        animate('0.5s', style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }))
      ])
    ])
  ]
})
export class DetailedViewComponent implements OnInit {
  box$ = this.store.select(getDetailViewBox);
  currencySymbol$ = this.store.select(getCurrencySymbol)
  loading$ = this.store.select(isBoxOpening);
  giftBoxState = '';
  obtainedWinningsState = ''

  constructor(private store: Store<Box | Wallet>, private router: Router) {
    this.box$.subscribe((box) => {
      console.log('box', box)

      if (box?.boxOpenings?.length || 0 > 0) {
        setTimeout(() => {
          this.giftBoxState = '';
          this.obtainedWinningsState = 'open'
        }, 2000);
      }
    })
  }

  /**
   * Open the box and add some animation
   * @param {string} boxId The box id to be opened
   */
  onGiftBoxTap(boxId: string) {
    this.giftBoxState = 'open';

    this.store.dispatch(openBox({
      payload: {
        boxId,
        amount: 1
      }
    }));
  }

  ngOnInit() {
    this.store.dispatch(fetchBoxes({
      payload: {
        free: false,
        purchasable: true,
        openable: true
      }
    }));
  }

  navigateToLobby() {
    this.router.navigate(['/'])
  }
}
