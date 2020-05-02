import { Injectable } from '@angular/core';
import { Packet } from 'src/app/shared/models/packet';

@Injectable({
  providedIn: 'root',
})
export class LearningService {
  isWordMatch(answer: string, correct: string): boolean {
    answer = answer.replace(/\s/g, '');
    correct = correct.replace(/\s/g, '');
    const words = correct.split(';');
    for (const word of words) {
      if (answer === word) {
        return true;
      }
    }
    return false;
  }

  shuffleWords(packet: Packet): Packet {
    for (let i = packet.words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [packet.words[i], packet.words[j]] = [packet.words[j], packet.words[i]];
    }
    return packet;
  }
}
