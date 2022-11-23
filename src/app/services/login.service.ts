import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  retrieveLogins(){
    return this.http.get('https://script.google.com/macros/s/AKfycbwiKXYiOVAZsNnJF8W6T5RYhmsxpl5SXI5ktOafV4jft4-FvMB2X5BUNtij8uTlZG7X/exec');
  }

  getLogin(req: any){
    return this.http.get(`https://script.google.com/macros/s/AKfycbzun78aOgIdSxr9yIFcq4rLubFO9dxofikEpaCJKwRkLmdvluuaFyhCziLe9Yi0Fvcd/exec?user=${req}`)
  }
}
