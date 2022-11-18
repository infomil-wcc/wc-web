import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieserviceService {


  constructor(private cookieService: CookieService) { }

  private today: Date = new Date();

  setCookie(name: string, value: string) {
    if(name !== '' && name !== undefined || value !=='' && value !== undefined) {
      this.cookieService.set(name,value, 1);
    }
  }

  getCookie(name: string): string{
    return this.cookieService.get(name);
  }

  delCookies() {
    this.cookieService.deleteAll();
  }
}
