import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() hideregister = new EventEmitter<boolean>();

  @ViewChild('trigramme') trigramme!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  public stepRegister: boolean = true;
  public iconCopy: string = 'content_copy';
  public registerDisabled: boolean = true;
  public displayName: string = '';
  public trigrammeDisplay: string = '';
  public btnLoader: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // pour les tests
    // this.displayName = 'Stephanie Chovrimootoo';
    // this.trigrammeDisplay ='iml-svm';
  }

  checkInput(){
    // console.log('checking Input...');
    if(this.trigramme.nativeElement.value == '' || this.name.nativeElement.value == ''){
      this.registerDisabled = true;
    } else {
      this.registerDisabled = false;
    }
  }

  registerUser() {
    if(!this.registerDisabled){
      this.displayName = this.name.nativeElement.value;
      this.trigrammeDisplay = this.trigramme.nativeElement.value;
      this.btnLoader = true;

      this.loginService.registerUser(this.trigramme.nativeElement.value, this.name.nativeElement.value).subscribe((res: any)=>{
        //console.log(res);
        if(res.data !=''){
          this.stepRegister = false;
          this.password.nativeElement.value = res.data.pass;
          this.btnLoader = false;
        }
      });
    }
  }

  hideRegister(){
    this.hideregister.emit(false);
  }

  copyToClipboard(){
    navigator.clipboard.writeText(this.password.nativeElement.value);
    this.iconCopy = 'done';
    setTimeout(() => {
      this.iconCopy = 'content_copy';
    }, 2000);
  }
}
