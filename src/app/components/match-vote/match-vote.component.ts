import { AbstractType, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-match-vote',
  templateUrl: './match-vote.component.html',
  styleUrls: ['./match-vote.component.scss']
})
export class MatchVoteComponent implements OnInit {

  constructor() { }

  @Input() voteType: string = '';
  @Input() matchId: number = 0;
  @Input() element!: any;
  @Input() showGame: boolean = false;
  @Input() showLogin: boolean = false;
  @Input() trigramme!: string;

  @Output() showGameChange =  new EventEmitter<boolean>();
  @Output() showLoginChange = new EventEmitter<boolean>();

  teamAFlag!: string;
  teamBFlag!: string;
  stepSelect: boolean = false;
  voteUrl: string = '';
  winDrawSelection: string = '';
  firstScoring: string = '';

  @ViewChild('halfTimeA') halfTimeA!: ElementRef;
  @ViewChild('halfTimeB') halfTimeB!: ElementRef;
  @ViewChild('fullTimeA') fullTimeA!: ElementRef;
  @ViewChild('fullTimeB') fullTimeB!: ElementRef;
  @ViewChild('scorerName') scorerName!: ElementRef;



  ngOnInit(): void {
    console.log('trigramme', this.trigramme);
    // console.log(this.element);
    this.showLoginChange.emit(false);
    this.stepSelect = this.showSelect(this.element.group);
    this.teamAFlag = `https://infomil-wcc.github.io/faq/flags/${this.getImg(this.element.team_a)}`;
    this.teamBFlag = `https://infomil-wcc.github.io/faq/flags/${this.getImg(this.element.team_b)}`;
    this.voteUrl = `${this.element.formID}/viewform?usp=pp_url&`;
    //https://docs.google.com/forms/d/e/1FAIpQLScCAlRavO8DJrNWJb1x7R1x2WgMZqRVrfav5d8YtE7F1uhHHw/viewform?usp=pp_url&entry.380496373=iml-ol&entry.421480785=S%C3%A9n%C3%A9gal
    //https://docs.google.com/forms/d/e/1FAIpQLScCAlRavO8DJrNWJb1x7R1x2WgMZqRVrfav5d8YtE7F1uhHHw/viewform?usp=pp_url&entry.380496373=iml-ol&entry.421480785=Draw+(Match+nul)
  }

  closeGame(){
    this.showGameChange.emit(false);
    console.log('close game');
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
    console.log(this.firstScoring);
  }

  validateVote(){
    console.log('Validate Vote first then proceed ?');
    let builtUrl;

    switch (this.element.group) {
      case 'WCF':
        builtUrl = this.buildURL('WCF', {'trigramme': this.trigramme, 'winDraw': this.winDrawSelection, 'halfTimeA': this.halfTimeA.nativeElement.value, 'halfTimeB': this.halfTimeB.nativeElement.value, 'fullTimeA': this.fullTimeA.nativeElement.value, 'fullTimeB': this.fullTimeB.nativeElement.value, 'firstScoring': this.firstScoring, 'scorer': this.scorerName.nativeElement.value});
        break;

      case 'SF':
      case 'QF':
        builtUrl = this.buildURL('SF', {'trigramme': this.trigramme, 'winDraw': this.winDrawSelection, 'fullTimeA': this.fullTimeA.nativeElement.value, 'fullTimeB': this.fullTimeB.nativeElement.value, 'scorer': this.scorerName.nativeElement.value});
      break

      case 'R16':
        builtUrl = this.buildURL('SF', {'trigramme': this.trigramme, 'winDraw': this.winDrawSelection, 'fullTimeA': this.fullTimeA.nativeElement.value, 'fullTimeB': this.fullTimeB.nativeElement.value});
        break;

      default:
        builtUrl = this.buildURL('pool', {'trigramme': this.trigramme,'winDraw': this.winDrawSelection});
        break;
    }
  }


  buildURL(type: string, data: any): string {
    console.log('build URL', type, data);
    switch (type) {
      case 'WCF':
        return this.voteUrl;
      break;


      case 'SF':
      case 'QF':
        return this.voteUrl;
      break;


      case 'R16':
        return this.voteUrl;
      break;


      default:
        return this.voteUrl;
      break;
    }
  }
}
