import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchResultsService {

  constructor(private http: HttpClient) { }

  getResults(){
    return this.http.get('https://script.google.com/macros/s/AKfycbxax3EXb2tx6sVXiIjKd4u-FrtS5ARAzq8AUiy4_rbziDl71P2uFy0zkD2iiB3VMDPPHw/exec');
  }
}
