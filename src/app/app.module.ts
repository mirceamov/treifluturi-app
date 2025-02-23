import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { GamesComponent } from './pages/games/games.component';
import { AboutComponent } from './pages/about/about.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BalloonPoppingComponent } from './games/balloon-popping/balloon-popping.component';

import { MatCardModule  } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

import { DifficultySelectorComponent } from './games/balloon-popping/components/difficulty-selector/difficulty-selector.component';
import { ClockComponent } from './games/balloon-popping/components/clock/clock.component';
import { DiceRollComponent } from './games/dice-roll/dice-roll.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    AboutComponent,
    BalloonPoppingComponent,
    DifficultySelectorComponent,
    ClockComponent,
    DiceRollComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatCardModule,
    MatIconModule,
    MatListModule,       // 👈 Import MatList for History List
    MatExpansionModule,  // 👈 Import MatExpansion for Stats Expandable Panel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
