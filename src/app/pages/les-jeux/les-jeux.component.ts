import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-les-jeux',
  templateUrl: './les-jeux.component.html',
  styleUrls: ['./les-jeux.component.scss']
})
export class LesJeuxComponent implements OnInit {

  constructor() { }

  @Input() dataLogin!: Object;
  @Input() matchesData!: Object;

  isLoggedIn: boolean = false;

  ngOnInit(): void {
  }



}
