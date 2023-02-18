import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoxesEffects } from './core/state/effects/boxes.effects';
import { SerializedRouterStateSnapshot, RouterStateSerializer, StoreRouterConnectingModule, RouterState, NavigationActionTiming } from '@ngrx/router-store';
import { initialState } from './core/state';
import { reducers } from './core/state/reducers';
import { WalletEffects } from './core/state/effects/wallet.effect';
import { UserEffects } from './core/state/effects/user.effect';
import { WalletSubscriptionService } from './core/services/WalletService';
import { WalletSubscriptionInitializer } from './core/factories/WalletSubscriptionFactory';
import { DetailedViewComponent } from './modules/detailed-view/detailed-view.component';
import { GamesComponent } from './modules/games/games.component';

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
