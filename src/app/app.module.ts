import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { GraphQLModule } from '@app/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoxesEffects } from '@effects/boxes.effects';
import { SerializedRouterStateSnapshot, RouterStateSerializer, StoreRouterConnectingModule, RouterState, NavigationActionTiming } from '@ngrx/router-store';
import { initialState } from '@state/index';
import { reducers } from '@reducers/index';
import { WalletEffects } from '@effects/wallet.effect';
import { UserEffects } from '@effects/user.effect';
import { WalletSubscriptionService } from '@services/WalletService';
import { WalletSubscriptionInitializer } from '@factories/WalletSubscriptionFactory';
import { DetailedViewComponent } from '@modules/detailed-view/detailed-view.component';
import { GamesComponent } from '@modules/games/games.component';

export class CustomRouterStateSerializer implements RouterStateSerializer<SerializedRouterStateSnapshot> {
  serialize(routerState: SerializedRouterStateSnapshot) {
    return {
      root: routerState.root,
      url: routerState.url,
      params: routerState.root.params,
      queryParams: routerState.root.queryParams,
    };
  }
}

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    DetailedViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { initialState }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
    EffectsModule.forRoot([BoxesEffects, WalletEffects, UserEffects]),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    WalletSubscriptionService,
    {
      provide: APP_INITIALIZER,
      useFactory: WalletSubscriptionInitializer,
      deps: [WalletSubscriptionService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
