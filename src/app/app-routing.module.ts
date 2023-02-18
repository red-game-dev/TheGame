import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailedViewComponent } from './modules/detailed-view/detailed-view.component';
import { GamesComponent } from './modules/games/games.component';

const routes: Routes = [
{ path: 'box/:id', component: DetailedViewComponent },
{ path: 'games', component: GamesComponent },
{ path: '', redirectTo: 'games', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
