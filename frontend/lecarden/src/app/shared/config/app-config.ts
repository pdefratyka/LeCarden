import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  private configurations: any = new Object();
  private jsonURL = './assets/i18n/en.json';

  constructor(private http: HttpClient) {}

  public getJSON(): Observable<any> {
    return this.http
      .get(this.jsonURL)
      .pipe(map(result => (this.configurations = result)));
  }
}
