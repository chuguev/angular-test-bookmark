import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BookListContainerComponent } from './containers/book-list/book-list-container.component';
import { AllBooksComponent } from './components/book-list/all-books/all-books.component';
import { BooksSharedModule } from './shared/books-shared.module';

@NgModule({
  declarations: [BookListContainerComponent, AllBooksComponent],
  imports: [CommonModule, BooksSharedModule, MatTabsModule, MatButtonModule, MatProgressSpinnerModule],
  exports: [BookListContainerComponent],
})
export class BooksModule {}
