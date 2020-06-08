import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { BookSearchBarComponent } from './components/book-search-bar.component';

/**
 * Строка поиска для списка книг
 */
@NgModule({
  declarations: [BookSearchBarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule],
  exports: [BookSearchBarComponent],
})
export class BookSearchBarModule {}
