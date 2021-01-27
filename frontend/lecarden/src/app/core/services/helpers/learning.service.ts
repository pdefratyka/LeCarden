import { Injectable } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { LanguageWayLearningMode } from 'src/app/shared/models/languageWayLearningMode';

@Injectable({
  providedIn: 'root',
})
export class LearningService {
  isWordMatch(
    answer: string,
    currentWord: Word,
    learningMode: LanguageWayLearningMode
  ): boolean {
    let correct =
      learningMode === LanguageWayLearningMode.KNOWN_TO_FOREIGN
        ? currentWord.translation
        : currentWord.name;
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

  shuffleWords(words: Word[]): void {
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
  }
}
