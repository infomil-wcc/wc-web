import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieserviceService } from 'src/app/services/cookieservice.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private cookie: CookieserviceService, private loginService: LoginService) { }

  public passType: string = 'password';
  public loginOK: boolean = true;
  public passOK: boolean = true;
  public emptyFields: boolean = false;
  public dataIsLoaded: boolean = false;
  public btnLoader: boolean = false;
  public visibility: string = 'visibility_off';

  @Input() showLogin!: boolean;

  @Output() successLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showLoginChange = new EventEmitter<boolean>();
  @Output() hideGame: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showReg: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() dataLogin!: any;
  @Input() matchesData!: any;
  @Input() matchId!: any;

  ngOnInit(): void {
    // console.log(this.dataLogin.data);
    // console.log(atob(this.dataLogin.data[3].password));
    // console.log(this.matchId);
  }

  toggleType(){
    if(this.passType == 'password'){
      this.passType = 'text';
      this.visibility = 'visibility';
    } else {
      this.passType = 'password';
      this.visibility = 'visibility_off'
    }
  }

  loginTrial(login: string, pass: string){
    if(pass !=='' && login !=='') {
      this.btnLoader = true;
      this.checkLogin(login, pass);
      this.emptyFields = false;
    } else if(pass =='' || login ==''){
      this.emptyFields = true;
      this.loginOK = true;
      this.passOK = true;
      this.btnLoader = false;
    }
  }


  checkLogin(login: string, pass: string){

    this.loginService.getLogin(login).subscribe((res)=>{
      this.dataLogin = res;
      this.checkPass(pass, this.dataLogin.data[0]);
    })

    // this.dataLogin.data.every((element: { username: string;}) =>{
    //   if(element.username == login) {
    //     this.loginOK = true;
    //     this.passOK = true;
    //     this.checkPass(pass, element);
    //     return false;
    //   } else {
    //     this.loginOK = false;
    //     this.cookie.delCookies();
    //     return true;
    //   }
    // })
  }

  checkPass(pass: string, data: any){
    if(atob(data.password) == pass){
      this.passOK = true;
      this.cookie.setCookie('user', data.username);
      this.cookie.setCookie('userData', JSON.stringify(data));

      // console.log(data);

      this.checkGamePlayed(this.matchId, data);

    } else {
      this.passOK = false;
      this.cookie.delCookies();
      this.btnLoader = false;
    }
  }

  loginSuccess(){
    this.successLogin.emit(true);
    this.hideLogin();
  }

  checkGamePlayed(matchId: any, data: any){
    if(data[`M${matchId}`] == 1){
      // TODO => Display error message.
      // console.log('Game already played =>', matchId);
      this.hideGame.emit(true);
      this.hideLogin();
    } else {
      this.loginSuccess();
    }
  }

  hideLogin(){
    this.showLoginChange.emit(false);
  }

  hideRegister(ev: any){
    this.showReg.emit(true);
    setTimeout(() => {
      this.hideLogin();
    }, 500);
  }
}
