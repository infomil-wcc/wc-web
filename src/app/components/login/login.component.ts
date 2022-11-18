import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieserviceService } from 'src/app/services/cookieservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private cookie: CookieserviceService) { }

  public passType: string = 'password';
  public loginOK: boolean = true;
  public passOK: boolean = true;
  public emptyFields: boolean = false;

  @Input() showLogin!: boolean;
  @Input() success!: boolean;
  @Output() successChange = new EventEmitter<boolean>();
  @Output() showLoginChange = new EventEmitter<boolean>();


  @Input() dataLogin!: any;
  @Input() matchesData!: any;

  ngOnInit(): void {
    console.log(this.dataLogin.data);
  }

  toggleType(){
    (this.passType == 'password') ? this.passType = 'text' : this.passType = 'password';
  }

  loginTrial(login: string, pass: string){
    if(pass !=='' && login !=='') {
      this.checkLogin(login,pass);
      this.emptyFields = false;
    } else if(pass =='' || login ==''){
      this.emptyFields = true;
      this.loginOK = true;
      this.passOK = true;
    }
  }


  checkLogin(login: string, pass: string){
    this.dataLogin.data.every((element: { username: string;}) =>{
      if(element.username == login) {
        this.loginOK = true;
        this.passOK = true;
        this.checkPass(pass, element);
        return false;
      } else {
        this.loginOK = false;
        this.cookie.delCookies();
        return true;
      }
    })
  }

  checkPass(pass: string, element: any){
    if(element.password == pass){
      this.passOK = true;
      this.successChange.emit(true);
      this.cookie.setCookie('user', element.username);
    } else {
      this.passOK = false;
      this.cookie.delCookies();
    }
  }

}
