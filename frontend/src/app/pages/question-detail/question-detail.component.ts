import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { MOCK_QUESTIONS, MOCK_ANSWERS, Question, Answer } from '../../data/mock-data';
import { SavedService } from '../../services/saved.service';

@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './question-detail.component.html',
  styleUrl: './question-detail.component.scss'
})
export class QuestionDetailComponent implements OnInit {
  question: Question | undefined;
  answers: Answer[] = [];
  activeSort = signal<'top' | 'newest'>('top');
  answerText = '';
  postAnonymously = false;

  constructor(private route: ActivatedRoute, public saved: SavedService) {}

  get isSaved(): boolean { return !!this.question && this.saved.savedIds().has(this.question.id); }
  toggleSave(): void { if (this.question) this.saved.toggle(this.question.id); }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.question = MOCK_QUESTIONS.find(q => q.id === id);
    this.answers = MOCK_ANSWERS.filter(a => a.questionId === id);
  }

  setSort(sort: 'top' | 'newest') {
    this.activeSort.set(sort);
  }

  get sortedAnswers(): Answer[] {
    return [...this.answers].sort((a, b) =>
      this.activeSort() === 'top' ? b.upvotes - a.upvotes : 0
    );
  }
}
