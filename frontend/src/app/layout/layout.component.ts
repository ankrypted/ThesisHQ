import { Component, computed, signal, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionModalService } from '../services/question-modal.service';
import { AuthService } from '../services/auth.service';

interface TopicOption { id: string; label: string; }

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  activeTopic = signal<string>('all');

  phdLifeTopics = [
    { id: 'advisor', label: 'Advisor & Committee', count: 234 },
    { id: 'funding', label: 'Funding & Grants', count: 156 },
    { id: 'mental-health', label: 'Mental Health', count: 312 },
    { id: 'job-market', label: 'Job Market', count: 189 },
    { id: 'thesis-writing', label: 'Thesis Writing', count: 278 },
    { id: 'qualifying-exams', label: 'Qualifying Exams', count: 143 },
  ];

  domainTopics = [
    { id: 'physics', label: 'Physics', count: 892 },
    { id: 'cs', label: 'Computer Science', count: 1243 },
    { id: 'math', label: 'Mathematics', count: 671 },
    { id: 'chemistry', label: 'Chemistry', count: 445 },
    { id: 'economics', label: 'Economics', count: 334 },
    { id: 'biology', label: 'Biology', count: 567 },
  ];

  contributors = [
    { name: 'Dr. Leila Rostami', field: 'Chemistry', answers: 312, initials: 'LR', color: 'chemistry' },
    { name: 'Marcus Webb', field: 'Computer Science', answers: 287, initials: 'MW', color: 'cs' },
    { name: 'Sarah Chen', field: 'Physics', answers: 241, initials: 'SC', color: 'physics' },
    { name: 'Priya Nair', field: 'Mathematics', answers: 198, initials: 'PN', color: 'math' },
    { name: 'James Okonkwo', field: 'Economics', answers: 156, initials: 'JO', color: 'economics' },
  ];

  trending = [
    { id: 4,  title: 'How do you survive your first year without a support system?', answers: 89 },
    { id: 9,  title: 'Best LaTeX setup for a 300-page dissertation?', answers: 67 },
    { id: 8,  title: 'Academia vs industry after PhD — honest takes?', answers: 134 },
    { id: 2,  title: 'Is it normal to feel like you know nothing in Year 3?', answers: 201 },
    { id: 6,  title: 'How to politely push back on Reviewer #2?', answers: 45 },
  ];

  // Modal form state
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

  constructor(public modal: QuestionModalService, public auth: AuthService) {}

  userInitials = computed(() => {
    const name = this.auth.currentUser()?.full_name ?? '';
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]!.toUpperCase())
      .join('');
  });

  userSubtitle = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return '';
    const stageLabels: Record<string, string> = {
      'year-1': 'Year 1', 'year-2': 'Year 2', 'year-3': 'Year 3',
      'year-4': 'Year 4', 'year-5': 'Year 5', 'year-6': 'Year 6+',
      postdoc: 'Postdoc', faculty: 'Faculty',
    };
    const stage = user.stage ? (stageLabels[user.stage] ?? user.stage) : null;
    return [stage, user.field].filter(Boolean).join(' · ');
  });

  logout() {
    this.auth.logout();
  }

  get canSubmit(): boolean {
    return this.questionTitle.trim().length > 0 && this.selectedTopic !== null;
  }

  setTopic(topicId: string) {
    this.activeTopic.set(topicId === this.activeTopic() ? 'all' : topicId);
  }

  closeModal() {
    this.modal.close();
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
  onEscape() { if (this.modal.isOpen()) this.closeModal(); }
}
