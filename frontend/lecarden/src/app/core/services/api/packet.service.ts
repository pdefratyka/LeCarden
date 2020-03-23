import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word } from 'src/app/shared/models/word';
import { Observable, throwError } from 'rxjs';
import { Packet } from 'src/app/shared/models/packet';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../security/token.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PacketService {
  private readonly url = '/api/word-service/packets';
  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  savePacket(packet: Packet): Observable<Packet> {
    console.log(packet);
    packet.userId = Number(this.tokenService.getUserId());
    return this.httpClient
      .post<Packet>(this.url, packet)
      .pipe(catchError(this.handleError));
  }

  getAllPackets(): Observable<Packet[]> {
    return this.httpClient
      .get<Packet[]>(
        this.url + '/user-id/' + Number(this.tokenService.getUserId())
      )
      .pipe(catchError(this.handleError));
  }

  getPacketById(id: string): Observable<Packet> {
    return this.httpClient
      .get<Packet>(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  handleError() {
    return throwError('There was some problem with the server.');
  }
}
