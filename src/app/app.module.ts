import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LogicComponent } from './components/logic/logic.component';
@NgModule({
  declarations: [AppComponent, ItemCardComponent, QuizPageComponent, LogicComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule // CLI adds AppRoutingModule to the AppModule's imports array
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
