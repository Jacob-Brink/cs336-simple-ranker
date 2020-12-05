import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CollectionCreateCardComponent } from './components/collection-create-card/collection-create-card.component';
import { CollectionPageComponent } from './pages/collection-page/collection-page.component';
import { ImageInputComponent } from './components/image-input/image-input.component';
import { ImageInputPreviewComponent } from './components/image-input-preview/image-input-preview.component';

@NgModule({
  declarations: [
      AppComponent,
      CollectionCreateCardComponent,
      CollectionPageComponent,
      ImageInputComponent,
      ImageInputPreviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
