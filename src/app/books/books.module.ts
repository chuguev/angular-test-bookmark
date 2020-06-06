import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookListComponent } from './containers/book-list/book-list.component';

@NgModule({
  declarations: [BookListComponent],
  imports: [CommonModule],
})
export class BooksModule {}
