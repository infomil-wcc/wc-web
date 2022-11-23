import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() hideregister = new EventEmitter<boolean>();

  @ViewChild('password') password!: ElementRef;

  public stepRegister: boolean = true;
  public iconCopy: string = 'content_copy';

  constructor() { }

  ngOnInit(): void {
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
