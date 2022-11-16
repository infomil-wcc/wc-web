import { getNumberOfCurrencyDigits } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {

    this.matchService.getResults().subscribe(data=>{
      let myData = data as any;
      let dataLength = myData.data.length;
      let count = 0;

      myData.data.forEach((elem: any) => {
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
            this.loaded = true,
            console.log(this.resultats)
          }
      })
    });
  }

  getImg(str: string): string{
    return str.replace(/[ ,]+/g, "-").toLowerCase() + '.png';
  }

}

