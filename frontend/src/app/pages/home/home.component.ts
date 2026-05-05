import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

interface Question {
  id: number;
  title: string;
  topic: string;
  topicType: string;
  author: string;
  stage: string;
  timeAgo: string;
  tags: string[];
  answers: number;
  upvotes: number;
  isAnonymous: boolean;
  hasTopAnswer?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  activeTab = signal<'latest' | 'trending' | 'unanswered'>('latest');
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

  questions: Question[] = [
    {
      id: 1,
      title: 'How do I derive the Schrödinger equation from first principles without assuming wave-particle duality?',
      topic: 'Physics',
      topicType: 'physics',
      author: 'Sarah Chen',
      stage: 'Year 3',
      timeAgo: '2h ago',
      tags: ['quantum-mechanics', 'derivation', 'wave-function'],
      answers: 12,
      upvotes: 47,
      isAnonymous: false,
      hasTopAnswer: true
    },
    {
      id: 2,
      title: 'My advisor keeps postponing our meetings — 3 cancellations in a row. Is this normal or a red flag?',
      topic: 'Advisor & Committee',
      topicType: 'phd-life',
      author: 'Anonymous',
      stage: 'Year 2',
      timeAgo: '4h ago',
      tags: ['advisor-relationship', 'communication', 'red-flags'],
      answers: 23,
      upvotes: 89,
      isAnonymous: true
    },
    {
      id: 3,
      title: "Implementing multi-head attention from scratch — getting NaN loss after 3 epochs, can't figure out why",
      topic: 'Computer Science',
      topicType: 'cs',
      author: 'Marcus Webb',
      stage: 'Year 4',
      timeAgo: '6h ago',
      tags: ['deep-learning', 'transformers', 'pytorch', 'debugging'],
      answers: 8,
      upvotes: 34,
      isAnonymous: false
    },
    {
      id: 4,
      title: 'Got rejected from all 5 grants I applied to this cycle. How do I keep going?',
      topic: 'Funding & Grants',
      topicType: 'phd-life',
      author: 'Anonymous',
      stage: 'Year 5',
      timeAgo: '8h ago',
      tags: ['funding', 'rejection', 'mental-health'],
      answers: 41,
      upvotes: 203,
      isAnonymous: true
    },
    {
      id: 5,
      title: 'Proving uniform convergence of a sequence of functions — is my epsilon-delta argument correct?',
      topic: 'Mathematics',
      topicType: 'math',
      author: 'Priya Nair',
      stage: 'Year 1',
      timeAgo: '12h ago',
      tags: ['real-analysis', 'convergence', 'proof-verification'],
      answers: 5,
      upvotes: 18,
      isAnonymous: false
    },
    {
      id: 6,
      title: 'Interpreting 2D NMR NOESY spectrum for protein structure — unusual cross-peaks at 7.2 ppm',
      topic: 'Chemistry',
      topicType: 'chemistry',
      author: 'Dr. Leila Rostami',
      stage: 'Post-doc',
      timeAgo: '1d ago',
      tags: ['NMR', 'protein-structure', 'spectroscopy'],
      answers: 7,
      upvotes: 29,
      isAnonymous: false,
      hasTopAnswer: true
    },
    {
      id: 7,
      title: "What's a realistic timeline to read 200+ papers before my qualifying exam in 6 weeks?",
      topic: 'Qualifying Exams',
      topicType: 'phd-life',
      author: 'Anonymous',
      stage: 'Year 2',
      timeAgo: '1d ago',
      tags: ['qual-prep', 'reading', 'time-management'],
      answers: 17,
      upvotes: 76,
      isAnonymous: true
    },
    {
      id: 8,
      title: 'Weak instruments in 2SLS: how bad is an F-statistic of 8.3 for my IV estimate?',
      topic: 'Economics',
      topicType: 'economics',
      author: 'James Okonkwo',
      stage: 'Year 3',
      timeAgo: '2d ago',
      tags: ['econometrics', 'instrumental-variables', '2SLS'],
      answers: 9,
      upvotes: 31,
      isAnonymous: false
    }
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

  setTab(tab: 'latest' | 'trending' | 'unanswered') {
    this.activeTab.set(tab);
  }

  setTopic(topicId: string) {
    this.activeTopic.set(topicId === this.activeTopic() ? 'all' : topicId);
  }

  get filteredQuestions(): Question[] {
    return this.questions;
  }
}
