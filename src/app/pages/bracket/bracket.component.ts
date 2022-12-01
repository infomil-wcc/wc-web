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
  public r16Voted: boolean = false;
  public quarterVoted: boolean = false;
  public semiVoted: boolean = false;
  public thirdVoted: boolean = false;
  public finalVoted: boolean = false;

  // Quart
  public quart1A: string = "";
  public quart1B: string = "";
  public quart2A: string = "";
  public quart2B: string = "";
  public quart3A: string = "";
  public quart3B: string = "";
  public quart4A: string = "";
  public quart4B: string = "";

  // Semi
  public semi1A: string = "";
  public semi1B: string = "";
  public semi2A: string = "";
  public semi2B: string = "";

  // Third place
  public third1A: string = "";
  public third1B: string = "";
  public thirdPlace: string = "";

  // Final
  public final1A: string = "";
  public final1B: string = "";
  public wccWinner: string = "";

  @Input() matchesData: any = [];

  ngOnInit(): void {
    let itemCount = 0;
    let itemLength = this.matchesData.data.length;
    // console.log(this.matchesData.data);

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
    this.r16Dates = this.getUniqueDates(this.r16Data);
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

  // NAVIGATION
  navClicked(next: boolean){
    // console.log('nav clicked, next ->', next);
    // console.log('current nav is ->', this.currentPhase);

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

  // SELECTIONS

  selectedR16(ev: any, name: string, matchId: any) {
    let parentGrouped = ev.target.closest('.grouped');
    let parentTeam = ev.target.closest('.team');
    let selected = ev.target as HTMLInputElement;
    let selectedVal = selected.value;

    parentGrouped.querySelectorAll('.team').forEach((element: any) => {
      element.classList.remove('active');
    });

    parentTeam.classList.add('active');
    parentGrouped.classList.add('voted');

    switch (matchId) {
      case 49:
        // set Quarter
        this.quart1A = name;
      break;

      case 50:
        // set Quarter
        this.quart1B = name;
      break;

      case 51:
        // set Quarter
        this.quart3A = name;
      break;

      case 52:
        // set Quarter
        this.quart3B = name
      break;

      case 53:
        // set Quarter
        this.quart2A = name;
      break;

      case 54:
        // set Quarter
        this.quart2B = name;
      break;

      case 55:
        // set Quarter
        this.quart4A = name;
      break;

      case 56:
        // set Quarter
        this.quart4B = name;
      break;

      default:
        // Do nothing!
      break;
    }

    this.verifyR16();
  }

  selectedQuarter(ev: any, name: string, matchId: any){
    let parentGrouped = ev.target.closest('.grouped');
    let parentTeam = ev.target.closest('.team');
    let selected = ev.target as HTMLInputElement;
    let selectedVal = selected.value;

    parentGrouped.querySelectorAll('.team').forEach((element: any) => {
      element.classList.remove('active');
    });

    parentTeam.classList.add('active');
    parentGrouped.classList.add('voted');

    switch (matchId) {
      case 57:
        // set Semi
        this.semi1A = name;
      break;

      case 58:
        // set Semi
        this.semi1B = name;
      break;

      case 59:
        // set Semi
        this.semi2A = name;
      break;

      case 60:
        // set Semi
        this.semi2B = name;
      break;

      default:
        // Do nothing!
      break;
    }

    this.verifyQuarter();
  }

  selectedSemi(ev: any, name: string, third: string, matchId: any){
    let parentGrouped = ev.target.closest('.grouped');
    let parentTeam = ev.target.closest('.team');
    let selected = ev.target as HTMLInputElement;

    parentGrouped.querySelectorAll('.team').forEach((element: any) => {
      element.classList.remove('active');
    });

    parentTeam.classList.add('active');
    parentGrouped.classList.add('voted');

    switch (matchId) {

      case 61:
        // set final + thirds
        this.final1A = name;
        this.third1A = third;
      break;

      case 62:
        // set final + thirds
        this.final1B = name;
        this.third1B = third;
      break;

      default:
        // Do nothing
        break;
    }

    this.verifySemi();
  }

  selectedThird(ev: any, name: string,){
    this.thirdPlace = name;
    this.verifyThird();
  }

  selectedFinal(ev: any, name: string){
    this.wccWinner = name;
    this.verifyFinal();
  }

  validateBracket(){
    // console.log('validate bracket');
  }


  // VERIFICATIONS

  verifyFinal(){
    if(this.wccWinner !== ""){
      this.finalVoted = true;
    }
  }

  verifyThird(){
    if(this.thirdPlace !==""){
      this.thirdVoted = true;
    }
  }

  verifySemi(){
    if(this.final1A !== "" && this.final1B !== "" && this.third1A !== "" && this.third1B !== "") {
      this.semiVoted = true;
    }
  }

  verifyR16(){
    if(this.quart1A !== "" && this.quart1B !== "" && this.quart2A !== "" && this.quart2B !== "" && this.quart3A !== "" && this.quart3B !== "" && this.quart4A !== "" && this.quart4B !== ""){
      this.r16Voted = true;
    }
  }

  verifyQuarter(){
    if(this.semi1A !== "" && this.semi1B !=="" && this.semi2A !== "" && this.semi2B !==""){
      this.quarterVoted = true;
    }
  }


  //Prefilled Link:
  // https://docs.google.com/forms/d/e/1FAIpQLSfY2K-NaaArfawI7ZniUqQgy8KWU8ySFL4lk_gjZY4hRbZOkA/viewform?usp=pp_url&entry.914592914=iml-ol&entry.1067275155=france&entry.1735911568=bresil&entry.1281783025=england&entry.1857586688=portugal&entry.1827861790=croatia&entry.1084438595=cameroun&entry.1726322809=serbia&entry.1763025529=korea&entry.201792987=costa+rica&entry.1926275789=germany&entry.1288419142=suisse&entry.1521289153=spain&entry.417482763=bresil&entry.781005520=france&entry.1952741567=portugal&entry.910046863=bresil
}
