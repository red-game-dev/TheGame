import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fetchBoxes, openBox } from 'src/app/core/state/actions/boxes.actions';
import { getDetailViewBox } from 'src/app/core/state/selectors/boxes.selectors';
import { getCurrencySymbol } from 'src/app/core/state/selectors/wallet.selectors';
import { Box } from 'src/app/core/models/box';
import { Wallet } from 'src/app/core/models/wallet';

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
  giftBoxState = '';
  obtainedWinningsState = ''

  constructor(private store: Store<Box | Wallet>, private router: Router) { }

  onGiftBoxClick(id: string) {
    this.giftBoxState = 'open';
    
    this.openBoxReward(id);
  }

  ngOnInit() {
    this.store.dispatch(fetchBoxes({
      payload: {
        free: false,
        purchasable: true,
        openable: true
      }
    }));

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

  navigateToLobby() {
    this.router.navigate(['/'])
  }

  openBoxReward(boxId: string, amount = 1) {
    this.store.dispatch(openBox({
      payload: {
        boxId,
        amount
      }
    }));
  }
}
