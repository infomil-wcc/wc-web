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
  // @Input() success!: boolean;
  @Output() successLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showLoginChange = new EventEmitter<boolean>();


  @Input() dataLogin!: any;
  @Input() matchesData!: any;

  ngOnInit(): void {
    // console.log(this.dataLogin.data);
    // console.log(atob(this.dataLogin.data[3].password));
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
    if(atob(element.password) == pass){
      this.passOK = true;
      this.cookie.setCookie('user', element.username);
      this.loginSuccess();
    } else {
      this.passOK = false;
      this.cookie.delCookies();
    }
  }

  loginSuccess(){
    this.successLogin.emit(true);
    this.hideLogin();
  }

  hideLogin(){
    this.showLoginChange.emit(false);
  }

}
