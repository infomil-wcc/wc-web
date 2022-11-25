import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classements',
  templateUrl: './classements.component.html',
  styleUrls: ['./classements.component.scss']
})
export class ClassementsComponent implements OnInit {

  constructor() { }

  public showPreloader = !true;

  ngOnInit(): void {
  }

}
