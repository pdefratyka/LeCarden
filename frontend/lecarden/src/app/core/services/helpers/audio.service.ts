import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  playAudio(url: string): void {
    if (url) {
      const audio = new Audio();
      audio.src = url;
      audio.load();
      audio.play();
    }
  }
}
