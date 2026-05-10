import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_TOPICS, TopicData } from '../../data/mock-data';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent {
  searchQuery = '';
  activeFilter = signal<'all' | 'domain' | 'phd-life'>('all');
  followedTopics = new Set<string>();

  allTopics: TopicData[] = MOCK_TOPICS;

  get filtered(): TopicData[] {
    const q = this.searchQuery.toLowerCase();
    return this.allTopics.filter(t => {
      const matchesFilter = this.activeFilter() === 'all' || t.type === this.activeFilter();
      const matchesSearch = !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }

  get domainTopics(): TopicData[] { return this.filtered.filter(t => t.type === 'domain'); }
  get phdLifeTopics(): TopicData[] { return this.filtered.filter(t => t.type === 'phd-life'); }

  setFilter(f: 'all' | 'domain' | 'phd-life') { this.activeFilter.set(f); }

  toggleFollow(slug: string) {
    this.followedTopics.has(slug) ? this.followedTopics.delete(slug) : this.followedTopics.add(slug);
  }

  isFollowing(slug: string): boolean { return this.followedTopics.has(slug); }

  formatCount(n: number): string {
    return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
  }
}
