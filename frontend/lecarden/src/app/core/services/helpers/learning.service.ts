import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LearningService {
  isWordMatch(answer: string, correct: string): boolean {
    return answer === correct.replace(/\s*$/, '');
  }
}
