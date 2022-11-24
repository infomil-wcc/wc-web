import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

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
import { AccueilComponent } from './pages/accueil/accueil.component';
import { PoolVoteComponent } from './components/pool-vote/pool-vote.component';
import { MatchVoteComponent } from './components/match-vote/match-vote.component';
import { LoginComponent } from './components/login/login.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { RegisterComponent } from './components/register/register.component';
import { HpNewsComponent } from './components/hp-news/hp-news.component';

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
    ReglesConditionsComponent,
    AccueilComponent,
    PoolVoteComponent,
    MatchVoteComponent,
    LoginComponent,
    PreloaderComponent,
    RegisterComponent,
    HpNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
