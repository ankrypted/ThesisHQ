import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { QuestionDetailComponent } from './pages/question-detail/question-detail.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { SavedComponent } from './pages/saved/saved.component';
import { MyQuestionsComponent } from './pages/my-questions/my-questions.component';
import { MyAnswersComponent } from './pages/my-answers/my-answers.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'question/:id', component: QuestionDetailComponent },
      { path: 'topics', component: TopicsComponent },
      { path: 'saved', component: SavedComponent },
      { path: 'my-questions', component: MyQuestionsComponent },
      { path: 'my-answers', component: MyAnswersComponent }
    ]
  }
];
