import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BookListContainer } from './containers/book-list/book-list.container';
import { BooksListWithSearch } from './components/book-list/books-list-with-search/books-list-with-search.component';
import { BooksSharedModule } from './shared/books-shared.module';

@NgModule({
  declarations: [BookListContainer, BooksListWithSearch],
  imports: [CommonModule, BooksSharedModule, MatTabsModule, MatButtonModule, MatProgressSpinnerModule],
  exports: [BookListContainer],
})
export class BooksModule {}
