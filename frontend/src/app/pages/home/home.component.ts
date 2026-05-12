import { Component, signal, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MOCK_QUESTIONS, Question } from '../../data/mock-data';
import { SavedService } from '../../services/saved.service';

interface TopicOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  activeTab = signal<'latest' | 'trending' | 'unanswered'>('latest');
  questions: Question[] = MOCK_QUESTIONS;

  constructor(public saved: SavedService) {}

  isSaved(id: number): boolean { return this.saved.savedIds().has(id); }

  toggleSave(id: number, event: Event): void {
    event.stopPropagation();
    this.saved.toggle(id);
  }

  // Modal state
  showModal = signal(false);
  questionTitle = '';
  questionBody = '';
  selectedTopic: TopicOption | null = null;
  tags: string[] = [];
  tagInput = '';
  isAnonymous = false;

  allTopics: TopicOption[] = [
    { id: 'physics',   label: 'Physics' },
    { id: 'cs',        label: 'Computer Science' },
    { id: 'math',      label: 'Mathematics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'economics', label: 'Economics' },
    { id: 'biology',   label: 'Biology' },
    { id: 'phd-life',  label: 'Advisor & Committee' },
    { id: 'phd-life',  label: 'Funding & Grants' },
    { id: 'phd-life',  label: 'Mental Health' },
    { id: 'phd-life',  label: 'Thesis Writing' },
    { id: 'phd-life',  label: 'Qualifying Exams' },
    { id: 'phd-life',  label: 'Job Market' },
  ];

  get canSubmit(): boolean {
    return this.questionTitle.trim().length > 0 && this.selectedTopic !== null;
  }

  setTab(tab: 'latest' | 'trending' | 'unanswered') {
    this.activeTab.set(tab);
  }

  get filteredQuestions(): Question[] {
    return this.questions;
  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.questionTitle = '';
    this.questionBody = '';
    this.selectedTopic = null;
    this.tags = [];
    this.tagInput = '';
    this.isAnonymous = false;
  }

  selectTopic(topic: TopicOption) {
    this.selectedTopic = this.selectedTopic?.label === topic.label ? null : topic;
  }

  onTagKeydown(event: KeyboardEvent) {
    if ((event.key === 'Enter' || event.key === ',') && this.tagInput.trim()) {
      event.preventDefault();
      const tag = this.tagInput.trim().toLowerCase().replace(/[\s,]+/g, '-');
      if (tag && !this.tags.includes(tag) && this.tags.length < 5) {
        this.tags.push(tag);
      }
      this.tagInput = '';
    } else if (event.key === 'Backspace' && !this.tagInput && this.tags.length) {
      this.tags.pop();
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.showModal()) this.closeModal();
  }
}
