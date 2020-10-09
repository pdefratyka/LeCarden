import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../security/token.service';
import { Observable } from 'rxjs';
import { Basket } from 'src/app/shared/models/basket';
import { BasketResult } from 'src/app/shared/models/basketResult';
import { EnvironmentService } from '../helpers/environment.service';
@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private readonly url = `${EnvironmentService.getUrl()}/basket-service/baskets`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  getAllPacketsForUser(): Observable<Basket[]> {
    return this.httpClient.get<Basket[]>(
      `${this.url}/user-id/${this.tokenService.getUserId()}`
    );
  }

  updateBaskets(basketResult: BasketResult): Observable<Basket[]> {
    return this.httpClient.post<Basket[]>(`${this.url}/update`, basketResult);
  }

  resetBaskets(packetId: number): Observable<void> {
    return this.httpClient.get<void>(
      `${this.url}/user-id/${this.tokenService.getUserId()}/packet/${packetId}`
    );
  }
}
