import { AbstractType, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CookieserviceService } from 'src/app/services/cookieservice.service';
import { MatchResultsService } from 'src/app/services/match-results.service';

@Component({
  selector: 'app-match-vote',
  templateUrl: './match-vote.component.html',
  styleUrls: ['./match-vote.component.scss']
})
export class MatchVoteComponent implements OnInit {

  constructor( private cookie: CookieserviceService, private matchService: MatchResultsService) {}

  @Input() voteType: string = '';
  @Input() matchId: number = 0;
  @Input() element!: any;
  @Input() showGame: boolean = false;
  @Input() showLogin: boolean = false;
  @Input() trigramme!: string;
  @Input() dataLogin!: any;

  @Output() showGameChange =  new EventEmitter<boolean>();
  @Output() showLoginChange = new EventEmitter<boolean>();
  @Output() gamePlayed: EventEmitter<boolean> = new EventEmitter<boolean>();

  teamAFlag!: string;
  teamBFlag!: string;
  stepSelect: boolean = false;
  btnLoader: boolean = false;
  voteUrl: string = '';
  builtUrl: string = '';
  winDrawSelection: string = '';
  firstScoring: string = '';
  submitted!: boolean;
  passOk: boolean = false;
  voteId: string = '';

  @ViewChild('halfTimeA') halfTimeA!: ElementRef;
  @ViewChild('halfTimeB') halfTimeB!: ElementRef;
  @ViewChild('fullTimeA') fullTimeA!: ElementRef;
  @ViewChild('fullTimeB') fullTimeB!: ElementRef;
  @ViewChild('scorerName') scorerName!: ElementRef;
  @ViewChild('pass') pass!: ElementRef;



  ngOnInit(): void {
    this.trigramme = this.cookie.getCookie('user');
    this.showLoginChange.emit(false);
    this.stepSelect = this.showSelect(this.element.group);
    this.teamAFlag = `https://infomil-wcc.github.io/faq/flags/${this.getImg(this.element.team_a)}`;
    this.teamBFlag = `https://infomil-wcc.github.io/faq/flags/${this.getImg(this.element.team_b)}`;
    this.voteUrl = `${this.element.formId}/formResponse?usp=pp_url&`;
    // console.log('showing game ->', this.element);
  }

  closeGame(){
    this.showGameChange.emit(false);
  }

  getImg(str: string): string{
    return str.replace(/[ ,]+/g, "-").toLowerCase() + '.png';
  }

  showSelect(elem: string){
    if(elem == 'SF' || elem == 'QF' || elem == 'R16' || elem == 'WCF') {
      return false
    } else {
      return true
    }
  }

  radioSelected(val: Event){
    let myVal = val.target as HTMLInputElement;
    this.winDrawSelection = myVal.value;

    if(this.winDrawSelection == this.element.team_a){
      this.voteId = 'A';
    }
    else if(this.winDrawSelection == this.element.team_b){
      this.voteId = 'B';
    }
    else {
      this.voteId = 'D';
    }
  }

  firstTeamScoring(event: Event){
    let myVal = event.target as HTMLInputElement;
    this.firstScoring = (myVal.checked) ? this.element.team_b : this.element.team_a;
    // console.log(this.firstScoring);
  }

  validateVote(){

    let fullScoreA = '';
    let fullScoreB = '';
    let halfScoreA = '';
    let haflScoreB = '';
    let scorer = '';
    let scoringFirst = '';

    switch (this.element.group) {
      case 'WCF':
        this.builtUrl = this.buildURL('WCF', {'trigramme': this.trigramme, 'winDraw': this.winDrawSelection, 'halfTimeA': this.halfTimeA.nativeElement.value, 'halfTimeB': this.halfTimeB.nativeElement.value, 'fullTimeA': this.fullTimeA.nativeElement.value, 'fullTimeB': this.fullTimeB.nativeElement.value, 'firstScoring': this.firstScoring, 'scorer': this.scorerName.nativeElement.value});
        fullScoreA = this.fullTimeA.nativeElement.value;
        fullScoreB = this.fullTimeB.nativeElement.value;
        scorer = this.scorerName.nativeElement.value;
        scoringFirst = this.firstScoring;
        break;

      case 'SF':
      case 'QF':
        this.builtUrl = this.buildURL('SF', {'trigramme': this.trigramme, 'winDraw': this.winDrawSelection, 'fullTimeA': this.fullTimeA.nativeElement.value, 'fullTimeB': this.fullTimeB.nativeElement.value, 'scorer': this.scorerName.nativeElement.value});
        fullScoreA = this.fullTimeA.nativeElement.value;
        fullScoreB = this.fullTimeB.nativeElement.value;
        scorer = this.scorerName.nativeElement.value;
      break

      case 'R16':
        this.builtUrl = this.buildURL('R16', {'trigramme': this.trigramme, 'winDraw': this.winDrawSelection, 'fullTimeA': this.fullTimeA.nativeElement.value, 'fullTimeB': this.fullTimeB.nativeElement.value});
        fullScoreA = this.fullTimeA.nativeElement.value;
        fullScoreB = this.fullTimeB.nativeElement.value;
        // console.log('Built-URL:', this.builtUrl);
        break;

      default:
        this.builtUrl = this.buildURL('pool', {'trigramme': this.trigramme,'winDraw': this.winDrawSelection});
        break;
    }

    this.updateViaFetch(this.element.gameId.toString(), this.trigramme, this.element.group, fullScoreA, fullScoreB, halfScoreA, haflScoreB, scorer, scoringFirst);
  }

  updateViaFetch(gameId: any, trigramme:any, groupType: any, fullscoreA: any, fullScoreB: any, halfScoreA: any, haflScoreB: any, scorer: string, scoringFirst: any){

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "NID=511=Nc0Y8lxUOEJeaBaWHAL0xo-voSQ70jY4d-6XV3V41eHiD_qE287CeQd-yRqo5_L-Z5ATjr90knjuOsadRZFGd5XRXouvm2DV7lsWFaY3sPhcsXfC4LYj7ainarTXz924baq-zwtKxL4oP8PT9XP6IBIcUdCOyVTtAesFdob1NVM");

    let additionalParams = '';

    switch (groupType) {
      case 'WCF':
        additionalParams = `&scoreA=${fullscoreA}&scoreB=${fullScoreB}&scorer=${scorer}&halfA=${halfScoreA}&halfB=${haflScoreB}`;
      break;

      case 'SF':
      case 'QF':
        additionalParams = `&scoreA=${fullscoreA}&scoreB=${fullScoreB}&scorer=${scorer}`;
      break;

      case 'R16':
        additionalParams = `&scoreA=${fullscoreA}&scoreB=${fullScoreB}`;
      break;

      default:

        break;
    }

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    } as any;

    // scoreA, scoreB
    fetch(`https://script.google.com/macros/s/AKfycbzun78aOgIdSxr9yIFcq4rLubFO9dxofikEpaCJKwRkLmdvluuaFyhCziLe9Yi0Fvcd/exec?user=${trigramme}&matchId=${gameId}&vote=${this.voteId}${additionalParams}`, requestOptions)
      .then((response) => {
        response.text()
      })
      .then((result) => {
        // console.log(result)
        setTimeout(() => {
          this.gamePlayed.emit(true);

          setTimeout(() => {
            this.closeGame();
          }, 2200);
        }, 1800);
      })
      .catch((error)=> {
        //  console.log('error', error);
         setTimeout(() => {
          this.gamePlayed.emit(true);

          setTimeout(() => {
            this.closeGame();
          }, 2200);
        }, 1800);
      });
  }


  buildURL(type: string, data: any): string {
    switch (type) {
      case 'WCF':
        return `${this.voteUrl}${this.element.eTrigramme}=${data.trigramme}&${this.element.eWinDraw}=${data.winDraw}&${this.element.eHalfScoreA}=${data.halfTimeA}&${this.element.eHalfScoreB}=${data.halfTimeB}&${this.element.eFullScoreA}=${data.fullTimeA}&${this.element.eFullScoreB}=${data.fullTimeB}&${this.element.eFirstGoal}=${data.firstScoring}&${this.element.eScorer}=${data.scorer}`;
      break;

      case 'SF':
      case 'QF':
        return `${this.voteUrl}${this.element.eTrigramme}=${data.trigramme}&${this.element.eWinDraw}=${data.winDraw}&${this.element.eFullScoreA}=${data.fullTimeA}&${this.element.eFullScoreB}=${data.fullTimeB}&${this.element.eScorer}=${data.scorer}`;
      break;

      case 'R16':
        return `${this.voteUrl}${this.element.eTrigramme}=${data.trigramme}&${this.element.eWinDraw}=${data.winDraw}&${this.element.eFullScoreA}=${data.fullTimeA}&${this.element.eFullScoreB}=${data.fullTimeB}`;
        break;

      default:
        return `${this.voteUrl}${this.element.eTrigramme}=${data.trigramme}&${this.element.eWinDraw}=${data.winDraw}`;
      break;
    }

  }

  resetAccount(){
    this.cookie.delCookies();
    this.gamePlayed.emit(true);
    this.showLoginChange.emit(true);
    this.closeGame();
  }

  checkPass() {
    if(this.pass.nativeElement.value !== ''){
      this.passOk = true;
    } else {
      this.passOk = false;
    }
  }
}
