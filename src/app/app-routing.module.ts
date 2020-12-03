import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';

const routes: Routes = [{ path: 'quiz-page', component: QuizPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
