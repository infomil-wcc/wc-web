import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TeamComponent } from './components/team/team.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { SondagesComponent } from './pages/sondages/sondages.component';
import { ClassementsComponent } from './pages/classements/classements.component';
import { LesJeuxComponent } from './pages/les-jeux/les-jeux.component';
import { ResultatsMatchsComponent } from './pages/resultats-matchs/resultats-matchs.component';
import { ReglesConditionsComponent } from './pages/regles-conditions/regles-conditions.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TeamComponent,
    NavigationComponent,
    TopHeaderComponent,
    SondagesComponent,
    ClassementsComponent,
    LesJeuxComponent,
    ResultatsMatchsComponent,
    ReglesConditionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
