import { getNumberOfCurrencyDigits } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { elementAt } from 'rxjs';
import { MatchResultsService } from 'src/app/services/match-results.service';
import { CookieserviceService } from 'src/app/services/cookieservice.service';
import { LoginService } from 'src/app/services/login.service';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-resultats-matchs',
  templateUrl: './resultats-matchs.component.html',
  styleUrls: ['./resultats-matchs.component.scss']
})
export class ResultatsMatchsComponent implements OnInit {

  constructor(private matchService : MatchResultsService, private cookie: CookieserviceService, private loginService: LoginService) { }

  public match: any = [];
  public loaded:boolean = false;
  public uniqueDates: any = [];

  public showLogin: boolean = false;
  public isLoggedIn: boolean = false;

  public showGame: boolean = false;

  public gameToVote: object = [];

  public trigramme: string = '';

  public userData!: any;

  public currentGameId!: any;

  @Input() dataLogin!: Object;
  @Input() matchesData: any;


  ngOnInit(): void {
      this.uniqueDates = this.getUniqueDates(this.matchesData.data);

      if(this.cookieExists()){
        this.checkUserData();
      } else{
        this.getMatchData('all');
     }
  }

  checkUserData() {
    this.trigramme = this.cookie.getCookie('user');

    (console.log('checking user data ->'));

    this.loginService.getLogin(this.trigramme).subscribe((res: any)=>{
      this.userData = res.data[0];
      this.cookie.setCookie('userData',JSON.stringify(this.userData));
      console.log('data received');
      this.getMatchData('');
    });
  }

  getMatchData(type: string){
    this.match.length = 0;

    console.log('supposed empty match data 1 ->', this.match)

    let dataLength = this.matchesData.data.length;
    let count = 0;

    this.matchesData.data.forEach((elem: any) => {

      count = count + 1;
      let res = {
        "hasPlayed": (elem.played == '0')? false : true,
        "date": this.parseMyDate(elem.date),
        "time": elem.time,
        "group": elem.group,
        "gameId": elem.id,
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
        "eWinDraw": elem.eWinDraw,
        "userPlayed": (type == 'all') ? false : this.checkPlayedMatches(elem.id)
      }

      this.match.push(res);

      if(count == dataLength){
        this.loaded = true;
      }
  })
  }

  playGame(elem: any){
    this.gameToVote = elem;

    if(this.cookieExists()){
      console.log('needs to open game', elem);
      this.showLogin = false;
      this.showGame = true;
    } else {
      this.currentGameId = elem.gameId;
      this.showLogin = true;
    }
  }

  cookieExists():boolean {
    (this.cookie.getCookie('user') !== '' && this.cookie.getCookie('userData') !== '') ? this.isLoggedIn = true: this.isLoggedIn = false;
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
    this.isLoggedIn = true;
    this.refreshMatches();
  }

  refreshMatches(){
    console.log('refresh matches');
    this.loaded = false;

    setTimeout(() => {
      this.match = [];
      this.loginService.getLogin(this.trigramme).subscribe().unsubscribe();
      this.checkUserData();
    }, 300);
  }

  checkPlayedMatches(id: any): boolean{
    if(this.isLoggedIn){
      return (this.userData[`M${id}`] == 1);
    } else {
      return false;
    }
  }

  gameUpdated(event: any){
      this.refreshMatches();
  }

  hideGame(event: any){
    this.showGame = false;
    this.refreshMatches();
  }
}

