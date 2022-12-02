import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private httpOptions: Object = {
    headers: new HttpHeaders({
      // 'Content-Type':  'application/json'
      'redirect': 'follow',
      'Content-Type':  'text/plain;charset=utf-8'

    })
  };


  retrieveLogins(){
    return this.http.get('https://script.google.com/macros/s/AKfycbwiKXYiOVAZsNnJF8W6T5RYhmsxpl5SXI5ktOafV4jft4-FvMB2X5BUNtij8uTlZG7X/exec');
  }

  getLogin(req: any){
    return this.http.get(`https://script.google.com/macros/s/AKfycbzun78aOgIdSxr9yIFcq4rLubFO9dxofikEpaCJKwRkLmdvluuaFyhCziLe9Yi0Fvcd/exec?user=${req}`)
  }

  registerUser(trigramme: string, userName: string){
    return this.http.get(`https://script.google.com/macros/s/AKfycbzun78aOgIdSxr9yIFcq4rLubFO9dxofikEpaCJKwRkLmdvluuaFyhCziLe9Yi0Fvcd/exec?addTrigramme=${trigramme}&addName=${userName}`);
  }
}
