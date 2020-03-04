import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word } from 'src/app/shared/models/word';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PacketService {
  private readonly url = 'http://localhost:8080/words';
  constructor(private readonly httpClient: HttpClient) {}

  savePacket(packetName: string, words: Word[]): Observable<Word[]> {
    console.log(packetName);
    console.log(words);
    return null;
  }
}
