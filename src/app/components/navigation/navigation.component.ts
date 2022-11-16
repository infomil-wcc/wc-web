import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  public showMenu: boolean = false;

  ngOnInit(): void {
  }


  nav(id: number): void {
    console.log('navigating with id ->', id);
  }

}
