import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Packet } from 'src/app/shared/models/packet';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../security/token.service';
import { EnvironmentService } from '../helpers/environment.service';

@Injectable({
  providedIn: 'root',
})
export class PacketService {
  private readonly url = `${EnvironmentService.getUrl()}/words/packets`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  savePacket(packet: Packet): Observable<Packet> {
    return this.httpClient
      .post<Packet>(this.url, {
        id: packet.id,
        name: packet.name,
        userId: this.tokenService.getUserId(),
        words: packet.words,
        languageId: packet.languageId,
      })
      .pipe(catchError(this.handleError));
  }

  getAllPacketsForUser(): Observable<Packet[]> {
    return this.httpClient
      .get<Packet[]>(`${this.url}/user-id/${this.tokenService.getUserId()}`)
      .pipe(catchError(this.handleError));
  }

  getPacketById(id: string): Observable<Packet> {
    return this.httpClient
      .get<Packet>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getFilteredPacket(packetId: string, resultId: string): Observable<Packet> {
    return this.httpClient
      .get<Packet>(
        `${
          this.url
        }/${packetId}/results/${resultId}`
      )
      .pipe(catchError(this.handleError));
  }

  deletePacketById(packetId: number) {
    return this.httpClient
      .delete(`${this.url}/${packetId}`)
      .pipe(catchError(this.handleError));
  }

  handleError() {
    return throwError('There was some problem with the server.');
  }
}
