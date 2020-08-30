import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Packet } from 'src/app/shared/models/packet';
import { take } from 'rxjs/operators';
import { Word } from 'src/app/shared/models/word';
import { Result } from 'src/app/shared/models/result';
import { WordResult } from 'src/app/shared/models/wordResult';
import { ScoreService } from 'src/app/core/services/helpers/score.service';
import { LearningService } from 'src/app/core/services/helpers/learning.service';
import { Answer } from 'src/app/shared/models/answer';
import { Statistic } from 'src/app/shared/models/statistic';
import { AudioService } from 'src/app/core/services/helpers/audio.service';
import { LearningMode } from 'src/app/shared/models/learningMode';
import { Store } from '@ngrx/store';
import {
  getLearningMode,
  getLearningPacket,
  ResultPageAction,
  getCurrentBasket,
} from '../store';
import { WordPageAction } from '../../word/store';
import { Basket } from 'src/app/shared/models/basket';
import { BasketService } from 'src/app/core/services/api/basket.service';
import { BasketResult } from 'src/app/shared/models/basketResult';
import { BasketWord } from 'src/app/shared/models/basketWord';

@Component({
  selector: 'app-learning-translation',
  templateUrl: './learning-translation.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './learning-translation.component.scss',
  ],
})
export class LearningTranslationComponent implements OnInit {
  LearningMode = LearningMode;
  packet: Packet;
  constantPacket: Packet;
  answer: Answer = { isCorrectAnswer: true } as Answer;
  statistic: Statistic = {
    numberOfGoodAnswers: 0,
    numberOfAttempts: 0,
    scoreAfterRound: [],
  };
  selectedMode: LearningMode;
  wordIterator = 0;
  wordResult: WordResult[] = [];
  packetSize: number;
  currentBasket: Basket;
  basketLearningMode: number;
  constructor(
    private readonly basketService: BasketService,
    private readonly scoreService: ScoreService,
    private readonly learningService: LearningService,
    private readonly audioService: AudioService,
    private readonly router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.store
      .select(getLearningMode)
      .pipe(take(1))
      .subscribe((mode) => (this.selectedMode = mode));

    this.store
      .select(getLearningPacket)
      .pipe(take(1))
      .subscribe((response) => {
        if (response) {
          this.packet = JSON.parse(JSON.stringify(response));
          this.constantPacket = JSON.parse(JSON.stringify(response));
          this.packetSize = this.packet.words.length;
        } else {
          this.router.navigateByUrl('/learn');
        }
      });

    this.store
      .select(getCurrentBasket)
      .pipe(take(1))
      .subscribe((res) => {
        this.currentBasket = res;
      });
    this.store
      .select(getLearningMode)
      .pipe(take(1))
      .subscribe((res) => {
        this.basketLearningMode = res;
      });
  }

  checkAnswer(answer: string): void {
    this.incrementAttempts();
    this.audioService.playAudio(this.packet.words[this.wordIterator].audioUrl);
    this.learningService.isWordMatch(
      answer,
      this.packet.words[this.wordIterator],
      this.selectedMode
    )
      ? this.correctAnswerAction()
      : this.wrongAnswerAction(answer);
  }

  continueAfterAnswerResponse(): void {
    this.answer.isCorrectAnswer = true;
    this.nextWord();
  }

  addSynonymToWord(): void {
    if (this.selectedMode === LearningMode.FOREGIN_TO_KNOWN) {
      this.packet.words[this.wordIterator].name =
        this.answer.correctAnswer + ';' + this.answer.userAnswer;
    } else {
      this.packet.words[this.wordIterator].translation =
        this.answer.correctAnswer + ';' + this.answer.userAnswer;
    }

    this.store.dispatch(
      WordPageAction.updateWord({
        word: this.packet.words[this.wordIterator],
      })
    );
    this.continueAfterAnswerResponse();
  }

  saveScore(): void {
    if (this.currentBasket?.id) {
      const tempBasketResult = {
        basket: this.currentBasket,
        wordResults: this.wordResult,
      } as BasketResult;
      this.basketService
        .updateBaskets(tempBasketResult)
        .subscribe((res) => console.log(res));
    } else if (this.currentBasket) {
      console.log('HMMMM');
      const tempBasketWord: BasketWord[] = [];
      for (const word of this.constantPacket.words) {
        tempBasketWord.push({ wordId: word.id } as BasketWord);
      }
      const tempBasketResult = {
        basket: {
          number: this.currentBasket.number,
          userId: this.packet.userId,
          packetId: this.packet.id,
          basketWords: tempBasketWord,
        } as Basket,
        wordResults: this.wordResult,
      };
      this.basketService
        .updateBaskets(tempBasketResult)
        .subscribe((res) => console.log(res));
    } else {
      this.store.dispatch(
        ResultPageAction.saveResult({
          result: {
            packetId: this.packet.id,
            userId: this.packet.userId,
            wordsResultsTOs: this.wordResult,
            learningMode: this.selectedMode,
            score: this.scoreService.getScore(
              this.statistic.numberOfAttempts,
              this.statistic.numberOfGoodAnswers
            ),
          } as Result,
        })
      );
    }
  }

  private nextWord(): void {
    this.wordIterator++;
    if (this.wordIterator === this.packet.words.length) {
      this.wordIterator = 0;
      this.statistic.scoreAfterRound.push(
        this.scoreService.getScoreFromLastRound(this.statistic)
      );
    }
  }

  private deleteWordFromArray(word: Word): void {
    const index: number = this.packet.words.indexOf(word);
    if (index !== -1) {
      this.packet.words.splice(index, 1);
    }
    if (this.wordIterator === this.packet.words.length) {
      this.wordIterator = 0;
      this.statistic.scoreAfterRound.push(
        this.scoreService.getScoreFromLastRound(this.statistic)
      );
    }
  }

  private correctAnswerAction(): void {
    this.statistic.numberOfGoodAnswers++;
    this.deleteWordFromArray(this.packet.words[this.wordIterator]);
    this.answer.correctAnswer = '';
  }

  private incrementAttempts(): void {
    this.statistic.numberOfAttempts++;

    const tempResult = this.wordResult.find(
      (w) => w.wordId === this.packet.words[this.wordIterator].id
    );

    tempResult
      ? tempResult.attempts++
      : this.wordResult.push({
          wordId: this.packet.words[this.wordIterator].id,
          attempts: 1,
        } as WordResult);
  }

  private wrongAnswerAction(answer: string): void {
    const tempCorrectAnswer =
      this.selectedMode === LearningMode.FOREGIN_TO_KNOWN
        ? this.packet.words[this.wordIterator].name
        : this.packet.words[this.wordIterator].translation;
    this.answer = {
      userAnswer: answer,
      correctAnswer: tempCorrectAnswer,
      isCorrectAnswer: false,
    } as Answer;
  }
}
