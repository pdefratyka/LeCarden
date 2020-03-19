import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { PacketService } from 'src/app/core/services/api/packet.service';
import { TokenService } from 'src/app/core/services/security/token.service';
import { Packet } from 'src/app/shared/models/packet';

@Component({
  selector: 'app-add-packet',
  templateUrl: './add-packet.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './add-packet.component.scss'
  ]
})
export class AddPacketComponent implements OnInit {
  wordsInPacket: Word[] = [];
  words: Word[];
  packetName: string;
  addedWordsIndex: Map<number, boolean> = new Map<number, boolean>();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly packetService: PacketService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map(data => data.words),
        take(1)
      )
      .subscribe(val => {
        this.words = val;
        this.words.forEach(w => this.addedWordsIndex.set(w.id, false));
      });
    this.route.data
      .pipe(
        map(data => data.packet),
        take(1)
      )
      .subscribe(val => {
        if (val !== undefined) {
          this.wordsInPacket = val.words;
          this.packetName = val.name;
        }
      });
  }

  addWordToPacket(word: Word): void {
    const index: number = this.wordsInPacket.indexOf(word);
    if (index === -1) {
      this.wordsInPacket.push(word);
      this.addedWordsIndex.set(word.id, true);
    }
  }

  removeWord(word: Word): void {
    const index: number = this.wordsInPacket.indexOf(word);
    if (index !== -1) {
      this.wordsInPacket.splice(index, 1);
      this.addedWordsIndex.set(word.id, false);
    }
  }

  savePacket(packetName: string): void {
    const packetId = this.route.snapshot.paramMap.get('id');
    if (packetId !== undefined) {
      this.packetService
        .savePacket({
          id: Number(packetId),
          name: packetName,
          userId: Number(this.tokenService.getUserId),
          words: this.wordsInPacket
        } as Packet)
        .pipe(take(1))
        .subscribe(() => this.router.navigate(['display-packet']));
    } else {
      this.packetService
        .savePacket({
          name: packetName,
          userId: Number(this.tokenService.getUserId),
          words: this.wordsInPacket
        } as Packet)
        .pipe(take(1))
        .subscribe();
    }
  }

  clearWordsInPacket(): void {
    this.wordsInPacket.length = 0;
    this.words.forEach(w => this.addedWordsIndex.set(w.id, false));
  }
}
