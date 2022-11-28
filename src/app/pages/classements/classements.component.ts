import { Component, OnInit } from '@angular/core';
import { RankingsService} from './../../services/rankings.service'

@Component({
  selector: 'app-classements',
  templateUrl: './classements.component.html',
  styleUrls: ['./classements.component.scss']
})
export class ClassementsComponent implements OnInit {

  constructor( private rankingService: RankingsService) { }

  public showPreloader = true;
  public rankingsData: any = [];

  ngOnInit(): void {
    this.getRanks();
  }

  getRanks(){
    this.rankingService.ranks.subscribe((res: any)=> {
      this.rankingsData = res.data;
      this.showPreloader = false;
      // console.log(this.rankingsData);
    })
  }

}
