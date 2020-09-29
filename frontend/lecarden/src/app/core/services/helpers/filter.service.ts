import { Injectable } from '@angular/core';
import { Packet } from 'src/app/shared/models/packet';
import { Word } from 'src/app/shared/models/word';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterPackets(packets: Packet[], filter: string): Packet[] {
    return packets.filter((p) => p.name.includes(filter));
  }

  filterWords(words: Word[], filter: string): Word[] {
    return words.filter((w) => {
      if (
        w.name.includes(filter) ||
        w.translation.includes(filter) ||
        w.category?.includes(filter) ||
        w.languageTO?.foreignLanguage.includes(filter) ||
        w.languageTO?.knownLanguage.includes(filter) ||
        `${w.languageTO?.foreignLanguage}/${w.languageTO?.knownLanguage}`.includes(
          filter
        )
      ) {
        return w;
      }
    });
  }
}
