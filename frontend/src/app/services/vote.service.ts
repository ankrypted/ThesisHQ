import { Injectable, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

interface VoteToggleResponse {
  upvoted: boolean;
  upvote_count: number;
}

interface MyVotesResponse {
  question_ids: number[];
  answer_ids: number[];
}

@Injectable({ providedIn: 'root' })
export class VoteService {
  votedQuestionIds = signal<Set<number>>(new Set());
  votedAnswerIds = signal<Set<number>>(new Set());
  questionCountOverrides = signal<Map<number, number>>(new Map());
  answerCountOverrides = signal<Map<number, number>>(new Map());

  constructor(private http: HttpClient, private auth: AuthService) {
    effect(() => {
      if (this.auth.isAuthenticated()) {
        this.loadMyVotes();
      } else {
        this.votedQuestionIds.set(new Set());
        this.votedAnswerIds.set(new Set());
      }
    });
  }

  isQuestionVoted(id: number): boolean {
    return this.votedQuestionIds().has(id);
  }

  isAnswerVoted(id: number): boolean {
    return this.votedAnswerIds().has(id);
  }

  questionCount(id: number, baseline: number): number {
    return this.questionCountOverrides().get(id) ?? baseline;
  }

  answerCount(id: number, baseline: number): number {
    return this.answerCountOverrides().get(id) ?? baseline;
  }

  async toggleQuestionVote(id: number): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<VoteToggleResponse>(`${environment.apiUrl}/votes/questions/${id}`, {})
    );
    const ids = new Set(this.votedQuestionIds());
    res.upvoted ? ids.add(id) : ids.delete(id);
    this.votedQuestionIds.set(ids);

    const counts = new Map(this.questionCountOverrides());
    counts.set(id, res.upvote_count);
    this.questionCountOverrides.set(counts);
  }

  async toggleAnswerVote(id: number): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<VoteToggleResponse>(`${environment.apiUrl}/votes/answers/${id}`, {})
    );
    const ids = new Set(this.votedAnswerIds());
    res.upvoted ? ids.add(id) : ids.delete(id);
    this.votedAnswerIds.set(ids);

    const counts = new Map(this.answerCountOverrides());
    counts.set(id, res.upvote_count);
    this.answerCountOverrides.set(counts);
  }

  private async loadMyVotes(): Promise<void> {
    const res = await firstValueFrom(
      this.http.get<MyVotesResponse>(`${environment.apiUrl}/votes/me`)
    );
    this.votedQuestionIds.set(new Set(res.question_ids));
    this.votedAnswerIds.set(new Set(res.answer_ids));
  }
}
