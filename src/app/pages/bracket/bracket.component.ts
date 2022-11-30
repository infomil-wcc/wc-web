import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {

  constructor() { }

  public prevActive: boolean = false;
  public nextActive: boolean = true;
  public finishActive: boolean = false;
  public currentPhase: number = 0;
  public r16Data: any = [];
  public r16Dates: any = [];


  @Input() matchesData: any = [];

  ngOnInit(): void {
    let itemCount = 0;
    let itemLength = this.matchesData.data.length;
    console.log(this.matchesData.data);

    this.matchesData.data.forEach((element: { group: string; }) => {
      itemCount = itemCount + 1;
      if(element.group == 'R16'){
        this.r16Data.push(element);
      }
      if(itemCount == itemLength) {
        this.doneR16Data();
      };
    })
  }

  doneR16Data(){
    console.log(this.r16Data);
    this.r16Dates = this.getUniqueDates(this.r16Data);
    console.log(this.r16Dates);
  }

  getUniqueDates(data: any){
    let dateKeys: any = [];

    data.forEach((element: { date: any; }) => {
      dateKeys.push(element.date);
    });

    return dateKeys.filter((v: any, i: any, a: string | any[]) => a.indexOf(v) === i);
  }

  parseMyDate(date: string) {
    let first = date.split('/');
    return `${first[1]}/${first[0]}/${first[2]}`;
  }

  navClicked(next: boolean){
    console.log('nav clicked, next ->', next);
    console.log('current nav is ->', this.currentPhase);

    if(next && this.currentPhase < 5 ){
      this.currentPhase = this.currentPhase + 1;
      this.prevActive = true;
    } else if(!next && this.currentPhase > 0) {
      this.currentPhase = this.currentPhase - 1;
      if(this.currentPhase == 0){
        this.prevActive = false;
      }
    }
  }

  validateBracket(){
    console.log('validate bracket');
  }

  selectedR16(ev: any, name: string) {
    let parentGrouped = ev.target.closest('.grouped');
    let parentTeam = ev.target.closest('.team');
    let selected = ev.target as HTMLInputElement;
    let selectedVal = selected.value;

    console.log('parentTeam, parentGrouped, selected, selectedVal =>', parentTeam, parentGrouped, selected, selectedVal)

    parentGrouped.querySelectorAll('.team').forEach((element: any) => {
      element.classList.remove('active');
    });

    parentTeam.classList.add('active');
    parentGrouped.classList.add('voted');

    console.log( ev.target.closest('.grouped'), name);
  }

  //Prefilled Link:
  // https://docs.google.com/forms/d/e/1FAIpQLSfY2K-NaaArfawI7ZniUqQgy8KWU8ySFL4lk_gjZY4hRbZOkA/viewform?usp=pp_url&entry.914592914=iml-ol&entry.1067275155=france&entry.1735911568=bresil&entry.1281783025=england&entry.1857586688=portugal&entry.1827861790=croatia&entry.1084438595=cameroun&entry.1726322809=serbia&entry.1763025529=korea&entry.201792987=costa+rica&entry.1926275789=germany&entry.1288419142=suisse&entry.1521289153=spain&entry.417482763=bresil&entry.781005520=france&entry.1952741567=portugal&entry.910046863=bresil
}
