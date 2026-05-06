import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_QUESTIONS, Question } from '../../data/mock-data';

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

  setTab(tab: 'latest' | 'trending' | 'unanswered') {
    this.activeTab.set(tab);
  }

  get filteredQuestions(): Question[] {
    return this.questions;
  }
}
