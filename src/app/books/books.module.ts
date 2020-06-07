import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { BookListContainer } from './containers/book-list/book-list-container.component';
import { SearchBarComponent } from './components/book-list/search-bar/search-bar.component';

@NgModule({
  declarations: [BookListContainer, SearchBarComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
  ],
  exports: [BookListContainer],
})
export class BooksModule {}
