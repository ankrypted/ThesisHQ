import { Injectable, signal } from '@angular/core';
import { MOCK_QUESTIONS, Question } from '../data/mock-data';

@Injectable({ providedIn: 'root' })
export class SavedService {
  savedIds = signal<Set<number>>(new Set());

  isSaved(id: number): boolean {
    return this.savedIds().has(id);
  }

  toggle(id: number): void {
    const next = new Set(this.savedIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.savedIds.set(next);
  }

  get savedQuestions(): Question[] {
    const ids = this.savedIds();
    return MOCK_QUESTIONS.filter(q => ids.has(q.id));
  }

  get count(): number {
    return this.savedIds().size;
  }
}
