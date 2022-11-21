import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SendtoformService {

  constructor(private http: HttpClient) { }

  private httpOptions: Object = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  send(url: any){
    return this.http.post(url, this.httpOptions);
  }
}
