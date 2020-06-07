import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { BookListContainer } from './containers/book-list/book-list-container.component';
import { FavoriteBooksComponent } from './components/book-list/favorite-books/favorite-books.component';
import { AllBooksComponent } from './components/book-list/all-books/all-books.component';
import { BooksSharedModule } from './shared/books-shared.module';

@NgModule({
  declarations: [BookListContainer, FavoriteBooksComponent, AllBooksComponent],
  imports: [CommonModule, BooksSharedModule, MatTabsModule],
  exports: [BookListContainer],
})
export class BooksModule {}
