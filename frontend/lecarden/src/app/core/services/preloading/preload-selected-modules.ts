import { Route } from '@angular/compiler/src/core';
import { PreloadingStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';

export class PreloadSelectedModules implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.loadChildren ? load() : of(null);
  }
}
