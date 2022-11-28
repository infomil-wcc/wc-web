import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {

  constructor() { }

  @Input() showCalcs: boolean = false;

  chargingText: string = 'Chargement en cours...'

  ngOnInit(): void {
    if(this.showCalcs){
      this.timeoutText('Calculs des rangs en cours...');
    }
  }

  timeoutText(txt: string) {
    setTimeout(() => {
      this.chargingText = txt;
    }, 4000);
  }



}


