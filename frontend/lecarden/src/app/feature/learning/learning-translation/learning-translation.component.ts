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
  BasketPageAction,
  LearnPageAction,
} from '../store';
import { WordPageAction } from '../../word/store';
import { Basket } from 'src/app/shared/models/basket';
import { BasketResult } from 'src/app/shared/models/basketResult';
import { BasketWord } from 'src/app/shared/models/basketWord';
import { TokenService } from 'src/app/core/services/security/token.service';

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
  answer: Answer;
  statistic: Statistic;
  selectedMode: LearningMode;
  wordIterator = 0;
  wordResult: WordResult[] = [];
  packetSize: number;
  currentBasket: Basket;
  finalBasketMode = false;
  editWordPanel = false;
  currentWord: Word;

  constructor(
    private readonly scoreService: ScoreService,
    private readonly learningService: LearningService,
    private readonly audioService: AudioService,
    private readonly router: Router,
    private readonly tokenService: TokenService,
    private store: Store
  ) {
    this.initStatistic();
    this.selectLearningMode();
    this.selectLearningPacket();
    this.selectCurrentBasket();
  }

  ngOnInit() {}

  checkAnswer(answer: string): void {
    this.editWordPanel = false;
    this.incrementAttempts();
    this.audioService.playAudio(this.packet.words[this.wordIterator].audioUrl);
    this.learningService.isWordMatch(
      answer,
      this.packet.words[this.wordIterator],
      this.selectedMode
    )
      ? this.correctAnswerAction(answer)
      : this.wrongAnswerAction(answer);
  }

  continueAfterAnswerResponse(): void {
    this.editWordPanel = false;
    this.nextWord(this.answer.isCorrectAnswer);
    this.answer = null;
  }

  saveScore(): void {
    if (this.currentBasket) {
      if (!this.currentBasket.id) {
        const tempBasketWord: BasketWord[] = [];
        for (const wordResult of this.wordResult) {
          tempBasketWord.push({ wordId: wordResult.wordId } as BasketWord);
        }
        this.currentBasket = {
          number: this.currentBasket.number,
          userId: this.tokenService.getUserId(),
          packetId: this.packet.id,
          basketWords: tempBasketWord,
        } as Basket;
      }
      this.store.dispatch(
        BasketPageAction.updateBasket({
          basketResult: {
            basket: this.currentBasket,
            wordResults: this.wordResult,
            isFinalBasketMode: this.finalBasketMode,
          } as BasketResult,
        })
      );
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

  displayEditPanel(): void {
    this.editWordPanel = !this.editWordPanel;
  }

  setFinalModeBasket(): void {
    this.finalBasketMode = !this.finalBasketMode;
    this.store.dispatch(LearnPageAction.setFinalBasketMode());
  }

  updateWord(word: Word): void {
    this.store.dispatch(WordPageAction.updateWord({ word }));
    const tempWord = this.packet.words.find((w) => w.id === word.id);
    tempWord.name = word.name;
    tempWord.translation = word.translation;
    tempWord.plural = word.plural;
    tempWord.audioUrl = word.audioUrl;
    tempWord.imageUrl = word.imageUrl;
  }

  private initStatistic(): void {
    this.statistic = {
      numberOfGoodAnswers: 0,
      numberOfAttempts: 0,
      scoreAfterRound: [],
    } as Statistic;
  }

  private selectLearningMode(): void {
    this.store
      .select(getLearningMode)
      .pipe(take(1))
      .subscribe((mode) => {
        this.selectedMode = mode;
      });
  }

  private selectLearningPacket(): void {
    this.store
      .select(getLearningPacket)
      .pipe(take(1))
      .subscribe((response) => {
        if (response) {
          this.packet = JSON.parse(JSON.stringify(response));
          this.packetSize = this.packet.words.length;
          this.learningService.shuffleWords(this.packet.words);
          this.currentWord = this.packet.words[this.wordIterator];
        } else {
          this.router.navigate(['learn']);
        }
      });
  }

  private selectCurrentBasket(): void {
    this.store
      .select(getCurrentBasket)
      .pipe(take(1))
      .subscribe((res) => {
        this.currentBasket = res;
      });
  }

  private nextWord(isCorrectAnswer: boolean): void {
    if (isCorrectAnswer) {
    } else {
      this.wordIterator++;
      if (this.wordIterator === this.packet.words.length) {
        this.wordIterator = 0;
        this.statistic.scoreAfterRound.push(
          this.scoreService.getScoreFromLastRound(this.statistic)
        );
      }
    }
    this.currentWord = this.packet.words[this.wordIterator];
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

  private correctAnswerAction(answer: string): void {
    const tempCorrectAnswer =
      this.selectedMode === LearningMode.FOREIGN_TO_KNOWN
        ? this.packet.words[this.wordIterator].name
        : this.packet.words[this.wordIterator].translation;
    this.answer = {
      userAnswer: answer,
      correctAnswer: tempCorrectAnswer,
      isCorrectAnswer: true,
    } as Answer;
    this.statistic.numberOfGoodAnswers++;
    this.deleteWordFromArray(this.packet.words[this.wordIterator]);
  }

  private wrongAnswerAction(answer: string): void {
    const tempCorrectAnswer =
      this.selectedMode === LearningMode.FOREIGN_TO_KNOWN
        ? this.packet.words[this.wordIterator].name
        : this.packet.words[this.wordIterator].translation;
    this.answer = {
      userAnswer: answer,
      correctAnswer: tempCorrectAnswer,
      isCorrectAnswer: false,
    } as Answer;
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
}
