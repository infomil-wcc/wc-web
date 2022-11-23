import { AbstractType, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CookieserviceService } from 'src/app/services/cookieservice.service';
import {SendtoformService} from 'src/app/services/sendtoform.service';

@Component({
  selector: 'app-match-vote',
  templateUrl: './match-vote.component.html',
  styleUrls: ['./match-vote.component.scss']
})
export class MatchVoteComponent implements OnInit {

  constructor( private cookie: CookieserviceService, private sendVoteService: SendtoformService) {}

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

  @ViewChild('halfTimeA') halfTimeA!: ElementRef;
  @ViewChild('halfTimeB') halfTimeB!: ElementRef;
  @ViewChild('fullTimeA') fullTimeA!: ElementRef;
  @ViewChild('fullTimeB') fullTimeB!: ElementRef;
  @ViewChild('scorerName') scorerName!: ElementRef;



  ngOnInit(): void {
    this.trigramme = this.cookie.getCookie('user');
    this.showLoginChange.emit(false);
    this.stepSelect = this.showSelect(this.element.group);
    this.teamAFlag = `https://infomil-wcc.github.io/faq/flags/${this.getImg(this.element.team_a)}`;
    this.teamBFlag = `https://infomil-wcc.github.io/faq/flags/${this.getImg(this.element.team_b)}`;
    this.voteUrl = `${this.element.formId}/formResponse?usp=pp_url&`;
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
  }

  firstTeamScoring(event: Event){
    let myVal = event.target as HTMLInputElement;
    this.firstScoring = (myVal.checked) ? this.element.team_b : this.element.team_a;
    // console.log(this.firstScoring);
  }

  validateVote(){

    switch (this.element.group) {
      case 'WCF':
        this.builtUrl = this.buildURL('WCF', {'trigramme': this.trigramme, 'winDraw': this.winDrawSelection, 'halfTimeA': this.halfTimeA.nativeElement.value, 'halfTimeB': this.halfTimeB.nativeElement.value, 'fullTimeA': this.fullTimeA.nativeElement.value, 'fullTimeB': this.fullTimeB.nativeElement.value, 'firstScoring': this.firstScoring, 'scorer': this.scorerName.nativeElement.value});
        break;

      case 'SF':
      case 'QF':
        this.builtUrl = this.buildURL('SF', {'trigramme': this.trigramme, 'winDraw': this.winDrawSelection, 'fullTimeA': this.fullTimeA.nativeElement.value, 'fullTimeB': this.fullTimeB.nativeElement.value, 'scorer': this.scorerName.nativeElement.value});
      break

      case 'R16':
        this.builtUrl = this.buildURL('SF', {'trigramme': this.trigramme, 'winDraw': this.winDrawSelection, 'fullTimeA': this.fullTimeA.nativeElement.value, 'fullTimeB': this.fullTimeB.nativeElement.value});
        break;

      default:
        this.builtUrl = this.buildURL('pool', {'trigramme': this.trigramme,'winDraw': this.winDrawSelection});
        break;
    }

    console.log('Built URL =>', this.builtUrl);

    // this.sendVoteService.send(this.builtUrl).subscribe((res)=>{
    //   console.log(res);
    // })


    setTimeout(() => {
      this.gamePlayed.emit(true);

      setTimeout(() => {
        this.closeGame();
      }, 500);
    }, 1000);
  }


  buildURL(type: string, data: any): string {
    // console.log('build URL', type, data);
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
    this.showLoginChange.emit(true);
    this.closeGame();
  }
}
