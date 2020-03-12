import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { get } from 'lodash';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  private configurations: any = new Object();
  private jsonURL = './assets/i18n/en.json';

  public getResourceByKey(key: any): any {
    return get(this.configurations, key);
  }

  constructor(private http: HttpClient) {
    this.getJSON()
      .pipe(take(1))
      .subscribe(result => {
        console.log(this.configurations);
      });
  }

  public getJSON(): Observable<any> {
    return this.http
      .get(this.jsonURL)
      .pipe(map(result => (this.configurations = result)));
  }
}
