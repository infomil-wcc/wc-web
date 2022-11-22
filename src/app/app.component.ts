import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { MatchResultsService } from './services/match-results.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public title = 'infomil-worldcup';
  public page = 0;
  public dataLoaded: boolean = false;

  public dataLogin: Object =[];
  public matchesData: Object =[];


  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private matchesService: MatchResultsService){
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.internalRoute(event.url.split('/#')[1])
      }
    });

    if(!this.dataLoaded) {
      // console.log('Data not loaded...');
      this.getData();
    }
  }

  getData():void {
    this.loginService.retrieveLogins().subscribe((data)=>{
      this.dataLogin = data;
      // console.log('D loaded...');
      this.getMatchesData();
    });
  }

  getMatchesData():void {
    this.matchesService.getMatches().subscribe((data)=>{
      this.matchesData = data;
      // console.log('M loaded...');
      this.dataLoaded = true;
    })
  }

  internalRoute(route: string):void {
    switch (route) {
      case 'resultats':
        this.page = 1;
        break;
      case 'les-jeux':
        this.page = 2;
        break;
      case 'news':
        this.page = 3;
        break;
      case 'classements':
        this.page = 4;
        break;
      case 'regles-conditions':
        this.page = 5;
        break;

      default:
        this.page = 0;
        break;
    }
  }

  ngOnInit():void {

  }
}
