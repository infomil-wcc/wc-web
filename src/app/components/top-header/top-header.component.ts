import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  public showRegister: boolean = false;
  public showLogin: boolean = false;
  public showLoader: boolean = false;
  public dataLogin: Object =[];
  public connected: boolean = false;

  ngOnInit(): void {
    // console.log(this.cookieService.get('user'));
    if(this.cookieService.get('user') !== ''){
      this.connected = true;
    } else {
      this.connected = false;
    }
  }

  successLogin(event: any){
    window.location.reload();
  }

  disconnect(){
    this.showLoader = true;
    this.cookieService.deleteAll();
    this.connected = false;
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  hideRegister(event: any){
    this.showRegister = !this.showRegister;
  }
}
