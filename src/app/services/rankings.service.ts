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
    return this.http.get(`https://script.google.com/macros/s/AKfycbzun78aOgIdSxr9yIFcq4rLubFO9dxofikEpaCJKwRkLmdvluuaFyhCziLe9Yi0Fvcd/exec`);
  }
}
