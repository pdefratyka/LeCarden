import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word } from 'src/app/shared/models/word';
import { Observable, throwError } from 'rxjs';
import { Packet } from 'src/app/shared/models/packet';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PacketService {
  private readonly url = '/api/word-service/packets';
  constructor(private readonly httpClient: HttpClient) {}

  savePacket(packetName: string, words: Word[]): Observable<Word[]> {
    return null;
  }

  getAllPackets(): Observable<Packet[]> {
    return this.httpClient
      .get<Packet[]>(this.url)
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
