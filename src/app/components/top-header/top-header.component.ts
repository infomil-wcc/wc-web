import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  constructor() { }
  public showRegister: boolean = false;
  public showLogin: boolean = false;
  public dataLogin: Object =[];

  ngOnInit(): void {
  }

  successLogin(event: any){
    window.location.reload();
  }

  hideRegister(event: any){
    this.showRegister = !this.showRegister;
  }
}
