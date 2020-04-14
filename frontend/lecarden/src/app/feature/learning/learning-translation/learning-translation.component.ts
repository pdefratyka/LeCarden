import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Packet } from 'src/app/shared/models/packet';
import { map, take } from 'rxjs/operators';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-learning-translation',
  templateUrl: './learning-translation.component.html',
  styleUrls: ['./learning-translation.component.scss'],
})
export class LearningTranslationComponent implements OnInit {
  packet: Packet;
  selectedMode: '';
  wordIterator = 0;
  correctAnswer = '';
  isCorrectAnswer = true;
  usersAnswer: string;
  numberOfGoodAnswers = 0;
  numberOfAttempts = 0;
  packetSize: number;
  scoreAfterRound: number[] = [];
  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.getPacketFromResolver();
    this.getSelectedMode();
  }

  checkAnswer(answer: string): void {
    this.numberOfAttempts++;
    this.usersAnswer = answer;
    if (this.isWordMatch(answer, this.packet.words[this.wordIterator].name)) {
      this.numberOfGoodAnswers++;
      this.deleteWordFromArray(this.packet.words[this.wordIterator]);
      this.correctAnswer = '';
    } else {
      this.correctAnswer = this.packet.words[this.wordIterator].name;
      this.nextWord();
      this.isCorrectAnswer = false;
    }
  }

  continue(): void {
    this.isCorrectAnswer = true;
  }

  private getPacketFromResolver(): void {
    this.route.data
      .pipe(
        map((data) => data.packet),
        take(1)
      )
      .subscribe((val) => {
        this.packet = val;
        this.packetSize = this.packet.words.length;
      });
  }

  private getSelectedMode(): void {
    const queryName = 'selectedMode';
    this.route.queryParams.subscribe((params) => {
      this.selectedMode = params[queryName];
    });
  }

  private nextWord(): void {
    this.wordIterator++;
    if (this.wordIterator === this.packet.words.length) {
      this.wordIterator = 0;
      console.log('next Word');
      this.scoreAfterRound.push(this.getScoreFromLastRound());
    }
  }

  private isWordMatch(answer: string, correct: string): boolean {
    // replace removes space from end
    return answer === correct.replace(/\s*$/, '');
  }

  private deleteWordFromArray(word: Word): void {
    const index: number = this.packet.words.indexOf(word);
    if (index !== -1) {
      this.packet.words.splice(index, 1);
    }
    if (this.wordIterator === this.packet.words.length) {
      this.wordIterator = 0;
      console.log('Delete word');
      this.scoreAfterRound.push(this.getScoreFromLastRound());
    }
  }

  private getScoreFromLastRound(): number {
    let result = this.numberOfGoodAnswers;
    for (const score of this.scoreAfterRound) {
      result -= score;
    }
    console.log(result);
    return result;
  }
}
