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
  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.getPacketFromResolver();
    this.getSelectedMode();
  }

  private getPacketFromResolver(): void {
    this.route.data
      .pipe(
        map((data) => data.packet),
        take(1)
      )
      .subscribe((val) => {
        this.packet = val;
      });
  }

  private getSelectedMode(): void {
    const queryName = 'selectedMode';
    this.route.queryParams.subscribe((params) => {
      this.selectedMode = params[queryName];
    });
  }

  checkAnswer(answer: string): void {
    if (this.isWordMatch(answer, this.packet.words[this.wordIterator].name)) {
      this.deleteWordFromArray(this.packet.words[this.wordIterator]);
    } else {
      console.log(this.packet.words[this.wordIterator].name);
      //this.nextWord();
    }
  }

  private nextWord(): void {
    this.wordIterator++;
    if (this.wordIterator === this.packet.words.length) {
      this.wordIterator = 0;
    }
  }

  private isWordMatch(answer: string, correct: string): boolean {
    const correctWithoutSpace = correct.replace(/\s*$/, '');

    return answer === correctWithoutSpace;
  }

  private deleteWordFromArray(word: Word): void {
    const index: number = this.packet.words.indexOf(word);
    if (index !== -1) {
      this.packet.words.splice(index, 1);
    }
  }
}
