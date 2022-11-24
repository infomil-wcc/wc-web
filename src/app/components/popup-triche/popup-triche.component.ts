import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup-triche',
  templateUrl: './popup-triche.component.html',
  styleUrls: ['./popup-triche.component.scss']
})
export class PopupTricheComponent implements OnInit {
  @Input() showPopinTriche!: boolean;
  @Output() showPopinTricheChange = new EventEmitter<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

  hidePopin(){
    this.showPopinTricheChange.emit(false);
  }

}
