import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SendtoformService {

  constructor(private http: HttpClient) { }

  settings: Object = {

  };

  send(url: any){
    return this.http.post(url,this.settings);
  }
}
