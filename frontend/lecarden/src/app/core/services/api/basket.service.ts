import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../security/token.service';
import { Observable } from 'rxjs';
import { Basket } from 'src/app/shared/models/basket';
@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private readonly url = '/api/basket-service/baskets';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  getAllPacketsForUser(): Observable<Basket[]> {
    console.log(this.tokenService.getUserId());
    return this.httpClient.get<Basket[]>(
      `${this.url}/user-id/${this.tokenService.getUserId()}`
    );
  }
}
