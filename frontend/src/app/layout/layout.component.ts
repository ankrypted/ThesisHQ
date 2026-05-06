import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NgClass],
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
    { title: 'How do you survive your first year without a support system?', answers: 89 },
    { title: 'Best LaTeX setup for a 300-page dissertation?', answers: 67 },
    { title: 'Academia vs industry after PhD — honest takes?', answers: 134 },
    { title: 'Is it normal to feel like you know nothing in Year 3?', answers: 201 },
    { title: 'How to politely push back on Reviewer #2?', answers: 45 },
  ];

  setTopic(topicId: string) {
    this.activeTopic.set(topicId === this.activeTopic() ? 'all' : topicId);
  }
}
