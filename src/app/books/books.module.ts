// TODO вынести материол
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { BookListContainerComponent } from './containers/book-list/book-list-container.component';
import { FavoriteBooksComponent } from './components/book-list/favorite-books/favorite-books.component';
import { AllBooksComponent } from './components/book-list/all-books/all-books.component';
import { BooksSharedModule } from './shared/books-shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BookListContainerComponent, FavoriteBooksComponent, AllBooksComponent],
  imports: [CommonModule, BooksSharedModule, MatTabsModule, MatButtonModule],
  exports: [BookListContainerComponent],
})
export class BooksModule {}
