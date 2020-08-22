import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Packet } from 'src/app/shared/models/packet';
import { take } from 'rxjs/operators';
import { Word } from 'src/app/shared/models/word';
import { Result } from 'src/app/shared/models/result';
import { WordResult } from 'src/app/shared/models/wordResult';
import { ResultService } from 'src/app/core/services/api/result.service';
import { ScoreService } from 'src/app/core/services/helpers/score.service';
import { LearningService } from 'src/app/core/services/helpers/learning.service';
import { Answer } from 'src/app/shared/models/answer';
import { Statistic } from 'src/app/shared/models/statistic';
import { WordService } from 'src/app/core/services/api/word.service';
import { AudioService } from 'src/app/core/services/helpers/audio.service';
import { LearningMode } from 'src/app/shared/models/learningMode';
import { Store } from '@ngrx/store';
import {
  getLearningMode,
  getLastResultMode,
  getLearningPacket,
  ResultPageAction,
} from '../store';

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
  result: Result;
  answer: Answer = new Answer('', '', true);
  statistic: Statistic = new Statistic(0, 0, []);
  selectedMode: LearningMode;
  wordIterator = 0;
  imageUrl = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly resultService: ResultService,
    private readonly scoreService: ScoreService,
    private readonly learningService: LearningService,
    private readonly wordService: WordService,
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
          this.initResult();
        } else {
          this.router.navigateByUrl('/learn');
        }
      });
  }

  checkAnswer(answer: string): void {
    this.incrementAttempts();
    let properAnswer: string;
    if (this.selectedMode == LearningMode.KNOWN_TO_FOREGIN) {
      properAnswer = this.packet.words[this.wordIterator].translation;
      console.log(1);
    } else {
      properAnswer = this.packet.words[this.wordIterator].name;
    }
    if (this.learningService.isWordMatch(answer, properAnswer)) {
      this.correctAnswerAction();
    } else {
      this.wrongAnswerAction(answer);
    }
  }

  continueAfterAnswerResponse(): void {
    this.answer.isCorrectAnswer = true;
    this.nextWord();
  }

  addSynonymToWord(): void {
    if (this.selectedMode == LearningMode.FOREGIN_TO_KNOWN) {
      this.packet.words[this.wordIterator].name =
        this.answer.correctAnswer + ';' + this.answer.userAnswer;
    } else {
      this.packet.words[this.wordIterator].translation =
        this.answer.correctAnswer + ';' + this.answer.userAnswer;
    }

    this.wordService
      .updateWord(this.packet.words[this.wordIterator])
      .pipe(take(1))
      .subscribe(() => {
        this.continueAfterAnswerResponse();
      });
  }

  /*private getPacketFromResolver(): void {
    this.route.data
      .pipe(
        map((data) => data.packet),
        take(1)
      )
      .subscribe((val) => {
        this.packet = this.learningService.shuffleWords(val);
        this.initResult();
      });
  }*/

  /*private getSelectedMode(): void {
    const queryName = 'selectedMode';
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.selectedMode = params[queryName];
    });
  }*/

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

  saveScore(): void {
    this.result.score = this.scoreService.getScore(
      this.statistic.numberOfAttempts,
      this.statistic.numberOfGoodAnswers
    );
    this.result.learningMode = this.selectedMode;
    if (this.statistic.numberOfAttempts > 0) {
      this.resultService
        .saveResult(this.result)
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(['learn']);
        });
    } else {
      this.router.navigate(['learn']);
    }
  }

  private correctAnswerAction(): void {
    this.audioService.playAudio(this.packet.words[this.wordIterator].audioUrl);
    this.statistic.numberOfGoodAnswers++;
    this.deleteWordFromArray(this.packet.words[this.wordIterator]);
    this.answer.correctAnswer = '';
  }

  private incrementAttempts() {
    this.statistic.numberOfAttempts++;
    this.result.wordsResultsTOs.filter(
      (w) => w.wordId === this.packet.words[this.wordIterator].id
    )[0].attempts++;
  }

  private wrongAnswerAction(answer: string): void {
    if (this.selectedMode == LearningMode.FOREGIN_TO_KNOWN) {
      this.answer = new Answer(
        answer,
        this.packet.words[this.wordIterator].name.split(';')[0],
        false
      );
    } else {
      this.answer = new Answer(
        answer,
        this.packet.words[this.wordIterator].translation.split(';')[0],
        false
      );
    }
    this.audioService.playAudio(this.packet.words[this.wordIterator].audioUrl);
  }

  private initResult(): void {
    this.result = new Result(
      this.packet.id,
      this.packet.userId,
      null,
      this.packet.words.map((w) => {
        return {
          wordId: w.id,
          attempts: 0,
        } as WordResult;
      })
    );
  }
}
