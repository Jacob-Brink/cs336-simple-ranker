import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from './credentials';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CollectionCreateCardComponent } from './components/collection-create-card/collection-create-card.component';
import { CollectionPageComponent } from './pages/collection-page/collection-page.component';
import { ImageInputComponent } from './components/image-input/image-input.component';
import { ImageInputPreviewComponent } from './components/image-input-preview/image-input-preview.component';
import { RankerServiceService } from './ranker-service.service';
import { PageComponent } from './components/page/page.component';
import { ButtonComponent } from './components/button/button.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QuizItemCardComponent } from './components/quiz-item-card/quiz-item-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CollectionCreateCardComponent,
    CollectionPageComponent,
    ImageInputComponent,
    ImageInputPreviewComponent,
    PageComponent,
    routingComponents,
    ButtonComponent,
    ItemCardComponent,
    QuizItemCardComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [RankerServiceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
