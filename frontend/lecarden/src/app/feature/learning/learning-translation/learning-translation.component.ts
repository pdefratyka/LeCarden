import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Packet } from 'src/app/shared/models/packet';
import { map, take } from 'rxjs/operators';
import { Word } from 'src/app/shared/models/word';
import { Result } from 'src/app/shared/models/result';
import { WordResult } from 'src/app/shared/models/wordResult';
import { ResultService } from 'src/app/core/services/api/result.service';

@Component({
  selector: 'app-learning-translation',
  templateUrl: './learning-translation.component.html',
  styleUrls: ['./learning-translation.component.scss'],
})
export class LearningTranslationComponent implements OnInit {
  packet: Packet;
  result: Result;
  selectedMode: '';
  wordIterator = 0;
  correctAnswer = '';
  isCorrectAnswer = true;
  usersAnswer: string;
  numberOfGoodAnswers = 0;
  numberOfAttempts = 0;
  packetSize: number;
  scoreAfterRound: number[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly resultService: ResultService
  ) {}

  ngOnInit() {
    this.getPacketFromResolver();
    this.getSelectedMode();
  }

  checkAnswer(answer: string): void {
    this.numberOfAttempts++;
    this.usersAnswer = answer;
    this.increamentWordAttempt();
    if (this.isWordMatch(answer, this.packet.words[this.wordIterator].name)) {
      this.correctAnswerResponse();
    } else {
      this.wrongAnswerResponse();
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
        this.initResult();
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
      this.scoreAfterRound.push(this.getScoreFromLastRound());
      this.saveScore();
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
      this.scoreAfterRound.push(this.getScoreFromLastRound());
      if (this.packet.words.length === 0) {
        this.saveScore();
      }
    }
  }

  private getScoreFromLastRound(): number {
    let result = this.numberOfGoodAnswers;
    for (const score of this.scoreAfterRound) {
      result -= score;
    }
    return result;
  }

  private saveScore(): void {
    this.resultService
      .saveResult(this.result)
      .pipe(take(1))
      .subscribe((response) => {
        console.log(response);
      });
  }

  private correctAnswerResponse(): void {
    this.numberOfGoodAnswers++;
    this.deleteWordFromArray(this.packet.words[this.wordIterator]);
    this.correctAnswer = '';
  }

  private increamentWordAttempt() {
    const wordResult = this.result.wordsResultsTOs.filter(
      (w) => w.wordId === this.packet.words[this.wordIterator].id
    );
    wordResult[0].attempts++;
  }

  private wrongAnswerResponse(): void {
    this.correctAnswer = this.packet.words[this.wordIterator].name;
    this.nextWord();
    this.isCorrectAnswer = false;
  }

  private initResult(): void {
    this.result = new Result();
    this.result.packetId = this.packet.id;
    this.result.userId = this.packet.userId;
    this.result.wordsResultsTOs = [];
    for (const word of this.packet.words) {
      const wordResult = new WordResult();
      wordResult.wordId = word.id;
      wordResult.attempts = 0;
      this.result.wordsResultsTOs.push(wordResult);
    }
  }
}
