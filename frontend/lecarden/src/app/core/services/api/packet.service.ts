import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Packet } from 'src/app/shared/models/packet';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../security/token.service';

@Injectable({
  providedIn: 'root',
})
export class PacketService {
  private readonly url = '/api/word-service/packets';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  savePacket(packet: Packet): Observable<Packet> {
    packet.userId = this.tokenService.getUserId();
    return this.httpClient
      .post<Packet>(this.url, packet)
      .pipe(catchError(this.handleError));
  }

  getAllPacketsForUser(userId: number): Observable<Packet[]> {
    return this.httpClient
      .get<Packet[]>(`${this.url}/user-id/${userId}`)
      .pipe(catchError(this.handleError));
  }

  getPacketById(id: string): Observable<Packet> {
    console.log(id);
    return this.httpClient
      .get<Packet>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getFilteredPacket(packetId: string, resultId: string): Observable<Packet> {
    return this.httpClient
      .get<Packet>(`${this.url}/${packetId}/results/${resultId}`)
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
