import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  constructor(private http: HttpClient) { }

  get ranks(){
    return this.http.get(`https://script.google.com/macros/s/AKfycbzAOHF_DLP0_a-A_wgKAEaJluIviXiY36qOI_OBANmpkZuCf875hh0BHT_PuT11SEu1Ig/exec`);
  }
}
