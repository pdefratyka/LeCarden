import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Packet } from 'src/app/shared/models/packet';
import { map, take } from 'rxjs/operators';
import { Word } from 'src/app/shared/models/word';
import { Result } from 'src/app/shared/models/result';
import { WordResult } from 'src/app/shared/models/wordResult';
import { ResultService } from 'src/app/core/services/api/result.service';
import { ScoreService } from 'src/app/core/services/helpers/score.service';
import { LearningService } from 'src/app/core/services/helpers/learning.service';
import { Answer } from 'src/app/shared/models/answer';
import { Statistic } from 'src/app/shared/models/statistic';
import { WordService } from 'src/app/core/services/api/word.service';

@Component({
  selector: 'app-learning-translation',
  templateUrl: './learning-translation.component.html',
  styleUrls: ['./learning-translation.component.scss'],
})
export class LearningTranslationComponent implements OnInit {
  packet: Packet;
  result: Result;
  answer: Answer = new Answer('', '', true);
  statistic: Statistic = new Statistic(0, 0, []);
  selectedMode: '';
  wordIterator = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly resultService: ResultService,
    private readonly scoreService: ScoreService,
    private readonly learningService: LearningService,
    private readonly wordService: WordService
  ) {}

  ngOnInit() {
    this.getPacketFromResolver();
    this.getSelectedMode();
  }

  checkAnswer(answer: string): void {
    this.incrementAttempts();
    if (
      this.learningService.isWordMatch(
        answer,
        this.packet.words[this.wordIterator].name
      )
    ) {
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
    const name = this.answer.correctAnswer + ';' + this.answer.userAnswer;
    this.wordService
      .updateWord(this.packet.words[this.wordIterator].id, name)
      .pipe(take(1))
      .subscribe(() => {
        this.packet.words[this.wordIterator].name = name;
        this.continueAfterAnswerResponse();
      });
  }

  private getPacketFromResolver(): void {
    this.route.data
      .pipe(
        map((data) => data.packet),
        take(1)
      )
      .subscribe((val) => {
        this.packet = this.learningService.shuffleWords(val);
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
      if (this.packet.words.length === 0) {
        this.saveScore();
      }
    }
  }

  private saveScore(): void {
    this.result.score = this.scoreService.getScore(
      this.statistic.numberOfAttempts,
      this.statistic.numberOfGoodAnswers
    );
    this.resultService.saveResult(this.result).pipe(take(1)).subscribe();
  }

  private correctAnswerAction(): void {
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
    this.answer = new Answer(
      answer,
      this.packet.words[this.wordIterator].name.split(';')[0],
      false
    );
  }

  private initResult(): void {
    this.result = new Result(
      this.packet.id,
      this.packet.userId,
      this.packet.words.map((w) => {
        return {
          wordId: w.id,
          attempts: 0,
        } as WordResult;
      })
    );
  }
}
