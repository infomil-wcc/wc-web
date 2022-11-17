import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-vote',
  templateUrl: './match-vote.component.html',
  styleUrls: ['./match-vote.component.scss']
})
export class MatchVoteComponent implements OnInit {

  constructor() { }

  @Input() voteType: string = '';
  @Input() matchId: number = 0;

  date: string = '00/00/00';
  time: string = '00h00';
  teamA: string = 'Team A';
  teamB: string = 'Team B';
  group: string = 'Z';
  teamAFlag: string = 'https://infomil-wcc.github.io/faq/flags/argentine.png';
  teamBFlag: string = 'https://infomil-wcc.github.io/faq/flags/argentine.png';
  trigramme: string = '';
  trigrammeId: string = '';
  pass: string = '';
  passId: string = '';
  winDraw: string = 'D';
  winDrawId: string = '';
  scoresFirst: string = 'A';
  scoresFirstId: string = '';
  halftimeA: number = 0;
  halfTimeAId: string = '';
  halftimeB: number = 0;
  halfTimeBId: string = '';
  fulltimeA: number = 0;
  fulltimeAId: string = '';
  fulltimeB: number = 0;
  fulltimeBId: string = '';
  scorer: string = 'Bobby Charlton';
  scorerId: string = '';

  ngOnInit(): void {
  }

}
