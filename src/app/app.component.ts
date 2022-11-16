import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public title = 'infomil-worldcup';
  public page = 0;

  constructor(private route: ActivatedRoute, private router: Router){
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.internalRoute(event.url.split('/#')[1])
      }
    });
  }

  ngOnInit():void {

  }


  internalRoute(route: string):void {
    switch (route) {
      case 'resultats':
        console.log('nav route -> resultats')
        this.page = 1;
        break;
      case 'les-jeux':
        console.log('nav route -> les-jeux');
        this.page = 2;
        break;
      case 'sondages':
        console.log('nav route -> sondages');
        this.page = 3;
        break;
      case 'classements':
        console.log('nav route -> classements');
        this.page = 4;
        break;
      case 'regles-conditions':
        console.log('nav route -> regles-conditions');
        this.page = 5;
        break;

      default:
        console.log('nav route -> accueil');
        this.page = 0;
        break;
    }
  }
}
