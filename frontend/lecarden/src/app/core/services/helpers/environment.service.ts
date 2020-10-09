import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  constructor() {}

  static getUrl(): string {
    return environment.url;
  }
}
