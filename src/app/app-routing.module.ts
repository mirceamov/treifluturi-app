import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent, GamesComponent, HomeComponent } from './pages';
import { BalloonPoppingComponent } from './games';
import { DiceRollComponent } from './games/dice-roll/dice-roll.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/balloon-pop', component: BalloonPoppingComponent },
  { path: 'games/dice-roll', component: DiceRollComponent },
  { path: 'about', component: AboutComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
