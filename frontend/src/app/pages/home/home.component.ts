import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_QUESTIONS, Question } from '../../data/mock-data';
import { SavedService } from '../../services/saved.service';
import { QuestionModalService } from '../../services/question-modal.service';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  activeTab = signal<'latest' | 'trending' | 'unanswered'>('latest');
  questions: Question[] = MOCK_QUESTIONS;

  constructor(public saved: SavedService, public modal: QuestionModalService, public vote: VoteService) {}

  setTab(tab: 'latest' | 'trending' | 'unanswered') { this.activeTab.set(tab); }

  get filteredQuestions(): Question[] { return this.questions; }

  isSaved(id: number): boolean { return this.saved.savedIds().has(id); }

  toggleSave(id: number, event: Event): void {
    event.stopPropagation();
    this.saved.toggle(id);
  }

  toggleUpvote(id: number, event: Event): void {
    event.stopPropagation();
    this.vote.toggleQuestionVote(id);
  }
}
