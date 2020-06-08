import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionBookListModule } from './selection-book-list/selection-book-list.module';
import { BookSearchBarModule } from './search-bar/book-search-bar.module';

/**
 * Список общих модулей
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, SelectionBookListModule, BookSearchBarModule],
  exports: [SelectionBookListModule, BookSearchBarModule],
})
export class BooksSharedModule {}
