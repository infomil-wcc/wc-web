import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  @Output() showGameChange =  new EventEmitter<boolean>();
  @Output() showLoginChange = new EventEmitter<boolean>();

  teamAFlag!: string;
  teamBFlag!: string;
  @Input() trigramme!: string;
  stepSelect: boolean = false;


  ngOnInit(): void {
    this.showLoginChange.emit(false);
    this.stepSelect = this.showSelect(this.element.group);
    this.teamAFlag = `https://infomil-wcc.github.io/faq/flags/${this.getImg(this.element.team_a)}`;
    this.teamBFlag = `https://infomil-wcc.github.io/faq/flags/${this.getImg(this.element.team_b)}`;
  }

  closeGame(){
    this.showGameChange.emit(false);
    console.log('close game');
  }

  getImg(str: string): string{
    return str.replace(/[ ,]+/g, "-").toLowerCase() + '.png';
  }

  showSelect(elem: string){
    console.log('showSelect ->', elem);
    if(elem == 'SF' || elem == 'QF' || elem == 'R16' || elem == 'WCF') {
      return false
    } else {
      return true
    }

  }
}
