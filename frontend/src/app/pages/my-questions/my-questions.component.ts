import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_QUESTIONS, Question } from '../../data/mock-data';
import { SavedService } from '../../services/saved.service';

const CURRENT_USER = 'Ankesh Prasad';

@Component({
  selector: 'app-my-questions',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './my-questions.component.html',
  styleUrl: './my-questions.component.scss'
})
export class MyQuestionsComponent {
  questions: Question[] = MOCK_QUESTIONS.filter(q => q.author === CURRENT_USER);

  constructor(public saved: SavedService) {}

  isSaved(id: number): boolean { return this.saved.savedIds().has(id); }

  toggleSave(id: number, event: Event): void {
    event.stopPropagation();
    this.saved.toggle(id);
  }

  get totalUpvotes(): number { return this.questions.reduce((sum, q) => sum + q.upvotes, 0); }
  get totalAnswers(): number { return this.questions.reduce((sum, q) => sum + q.answers, 0); }
  get answeredCount(): number { return this.questions.filter(q => q.answers > 0).length; }
}
