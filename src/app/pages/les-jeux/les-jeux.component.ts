import { Component, Input, OnInit } from '@angular/core';
import { CookieserviceService } from 'src/app/services/cookieservice.service';
@Component({
  selector: 'app-les-jeux',
  templateUrl: './les-jeux.component.html',
  styleUrls: ['./les-jeux.component.scss']
})
export class LesJeuxComponent implements OnInit {

  constructor(private cookie: CookieserviceService) { }

  @Input() dataLogin!: Object;
  @Input() matchesData!: Object;

  showLogin: boolean = false;
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.cookieExists();
  }

  cookieExists():boolean {
    (this.cookie.getCookie('user') !== '')? this.isLoggedIn = true: this.isLoggedIn = false;
    console.log('is logged in ?', this.isLoggedIn);
    return this.isLoggedIn;
  }


}
