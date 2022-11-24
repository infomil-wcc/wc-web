import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchResultsService {

  constructor(private http: HttpClient) { }

  getMatches(){
    return this.http.get('https://script.google.com/macros/s/AKfycbxjAD2b5L2qx57lBbK6VtHBEU5ombhMVCkFGL6p16LjCoJVilHj22zmDMFGDqNh9CjuFA/exec');
  }

  // updateMatchVote(trigramme: any, matchId: any, pass: any){
  //   console.log('Update match Service ->', trigramme, matchId, pass);
  //   return this.http.get(`https://script.google.com/macros/s/AKfycbzun78aOgIdSxr9yIFcq4rLubFO9dxofikEpaCJKwRkLmdvluuaFyhCziLe9Yi0Fvcd/exec?&user=${trigramme}&matchId=${matchId}&password=${pass}`)
  // }

}
