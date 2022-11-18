import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  public passType: string = 'password';
  public loginOK: boolean = true;
  public passOK: boolean = true;

  @Input() success!: boolean;
  @Output() successChange = new EventEmitter<boolean>();

  @Input() dataLogin!: any;
  @Input() matchesData!: any;

  ngOnInit(): void {
    console.log(this.dataLogin.data);
  }

  toggleType(){
    (this.passType == 'password') ? this.passType = 'text' : this.passType = 'password';
  }

  loginTrial(login: string, pass: string){
    if(this.checkLoginInfos(login,pass)) {
      this.successChange.emit(true);
    }
  }

  checkLoginInfos(login: string, pass: string): boolean {
    let success = false;

    // this.dataLogin.data.forEach((element: { username: string; password: string;}) => {
    //   if(element.username == login && element.password == pass) {
    //     console.log('using username and found', element);
    //     this.loginOK = true;
    //     this.passOK = true;
    //     break
    //   } else {
    //     console.log('login or password incorrect')
    //   }
    // });

    this.dataLogin.data.every((element: { username: string; password: string;}) =>{
      if(element.username == login) {
        console.log('using username and found', element);
        this.loginOK = true;
        return false;
      } else {
        console.log('login incorrect');
        this.loginOK = false;
        return true;
      } 
    })

    console.log('finished checking');
    return success;
  }

}
