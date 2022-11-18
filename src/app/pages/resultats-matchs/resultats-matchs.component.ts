import { getNumberOfCurrencyDigits } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatchResultsService } from 'src/app/services/match-results.service';
@Component({
  selector: 'app-resultats-matchs',
  templateUrl: './resultats-matchs.component.html',
  styleUrls: ['./resultats-matchs.component.scss']
})
export class ResultatsMatchsComponent implements OnInit {

  constructor(private matchService : MatchResultsService) { }

  public resultats: any = [];
  public loaded:boolean = false;
  public uniqueDates: any = [];

  @Input() matchesData: any;

  ngOnInit(): void {
      let dataLength = this.matchesData.data.length;
      let count = 0;
      this.uniqueDates = this.getUniqueDates(this.matchesData.data);

      this.matchesData.data.forEach((elem: any) => {
          count = count + 1;
          let res = {
            "date": elem.date,
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
          }

          this.resultats.push(res);

          if(count == dataLength){
            this.loaded = true;
          }
      })
  }

  getImg(str: string): string{
    return str.replace(/[ ,]+/g, "-").toLowerCase() + '.png';
  }

  getUniqueDates(data: any){
    let dateKeys: any = [];

    data.forEach((element: { date: any; }) => {
      dateKeys.push(element.date);
    });

    return dateKeys.filter((v: any, i: any, a: string | any[]) => a.indexOf(v) === i);
  }

}

