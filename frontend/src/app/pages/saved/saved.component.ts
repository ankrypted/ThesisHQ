import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SavedService } from '../../services/saved.service';
import { Question } from '../../data/mock-data';

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.scss'
})
export class SavedComponent {
  constructor(public saved: SavedService) {}

  get questions(): Question[] { return this.saved.savedQuestions; }

  isSaved(id: number): boolean { return this.saved.savedIds().has(id); }

  unsave(id: number, event: Event): void {
    event.stopPropagation();
    this.saved.toggle(id);
  }
}
