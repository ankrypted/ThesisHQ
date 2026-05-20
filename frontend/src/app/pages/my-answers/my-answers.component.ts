import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_ANSWERS, MOCK_QUESTIONS } from '../../data/mock-data';

const CURRENT_USER = 'Ankesh Prasad';

@Component({
  selector: 'app-my-answers',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './my-answers.component.html',
  styleUrl: './my-answers.component.scss'
})
export class MyAnswersComponent {
  answers = MOCK_ANSWERS
    .filter(a => a.author === CURRENT_USER)
    .map(a => {
      const q = MOCK_QUESTIONS.find(q => q.id === a.questionId);
      return { ...a, questionTitle: q?.title ?? '', questionTopic: q?.topic ?? '', questionTopicType: q?.topicType ?? '' };
    });

  get totalUpvotes(): number { return this.answers.reduce((sum, a) => sum + a.upvotes, 0); }
  get topAnswerCount(): number { return this.answers.filter(a => a.isTopAnswer).length; }

  truncate(text: string, limit = 220): string {
    return text.length > limit ? text.slice(0, limit).trimEnd() + '…' : text;
  }
}
