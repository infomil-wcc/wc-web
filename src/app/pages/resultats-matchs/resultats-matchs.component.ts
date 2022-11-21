import { getNumberOfCurrencyDigits } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { MatchResultsService } from 'src/app/services/match-results.service';
import { CookieserviceService } from 'src/app/services/cookieservice.service';

@Component({
  selector: 'app-resultats-matchs',
  templateUrl: './resultats-matchs.component.html',
  styleUrls: ['./resultats-matchs.component.scss']
})
export class ResultatsMatchsComponent implements OnInit {

  constructor(private matchService : MatchResultsService, private cookie: CookieserviceService) { }

  public match: any = [];
  public loaded:boolean = false;
  public uniqueDates: any = [];

  public showLogin: boolean = false;
  public isLoggedIn: boolean = false;

  public showGame: boolean = false;

  public gameToVote: object = [];

  public trigramme: string = '';

  @Input() dataLogin!: Object;
  @Input() matchesData: any;

  ngOnInit(): void {
      let dataLength = this.matchesData.data.length;
      let count = 0;
      this.uniqueDates = this.getUniqueDates(this.matchesData.data);

      // console.log('matches data', this.matchesData);

      this.matchesData.data.forEach((elem: any) => {
          count = count + 1;
          let res = {
            "hasPlayed": (elem.played == '0')? false : true,
            "date": this.parseMyDate(elem.date),
            "time": elem.time,
            "group": elem.group,
            "played": elem.played,
            "team_a": elem.team_a,
            "team_a_img": this.getImg(elem.team_a),
            "team_b": elem.team_b,
            "team_b_img": this.getImg(elem.team_b),
            "score_a": elem.score_a,
            "score_b": elem.score_b,
            "winDraw": elem.winner_draw,
            "activeToVote": elem.actived,
            "voteCloseTime": elem.closing_time,
            "formId": elem.form_ID,
            "eFirstGoal": elem.eFirstGoal,
            "eFullScoreA": elem.eFullScoreA,
            "eFullScoreB": elem.eFullScoreB,
            "eHalfScoreA": elem.eHalfScoreA,
            "eHalfScoreB": elem.eHalfScoreB,
            "eScorer": elem.eScorer,
            "eTrigramme": elem.eTrigramme,
            "eWinDraw": elem.eWinDraw
          }

          this.match.push(res);

          if(count == dataLength){
            this.loaded = true;
            // console.log('match', this.match);
          }
      })
  }

  playGame(elem: any){
    this.gameToVote = elem;

    if(this.cookieExists()){
      console.log('needs to open game', elem);
      this.showGame = true;
      this.showLogin = false;
      this.trigramme = this.cookie.getCookie('user');
    } else {
      this.showLogin = true;
    }
  }

  cookieExists():boolean {
    (this.cookie.getCookie('user') !== '')? this.isLoggedIn = true: this.isLoggedIn = false;
    console.log('is logged in ?', this.isLoggedIn);
    return this.isLoggedIn;
  }

  getImg(str: string): string{
    return str.replace(/[ ,]+/g, "-").toLowerCase() + '.png';
  }

  getUniqueDates(data: any){
    let dateKeys: any = [];

    data.forEach((element: { date: any; }) => {
      dateKeys.push(this.parseMyDate(element.date));
    });

    return dateKeys.filter((v: any, i: any, a: string | any[]) => a.indexOf(v) === i);
  }

  parseMyDate(date: string) {
    let first = date.split('/');
    return `${first[1]}/${first[0]}/${first[2]}`;
  }

  loginSuccess(event: any){
    console.log('login succeeded', event);
    this.showGame = true;

  }

}

