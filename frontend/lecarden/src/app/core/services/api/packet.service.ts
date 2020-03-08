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
  private readonly url = '/api/packets';
  constructor(private readonly httpClient: HttpClient) {}

  savePacket(packetName: string, words: Word[]): Observable<Word[]> {
    console.log(packetName);
    console.log(words);
    return null;
  }

  getAllPackets(): Observable<Packet[]> {
    console.log('get all');
    return this.httpClient.get<Packet[]>(this.url);
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
