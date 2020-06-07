import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SelectionBookListComponent } from './components/selection-book-list.component';

/**
 * Модуль отображения выбираемого списка книг
 */
@NgModule({
  declarations: [SelectionBookListComponent],
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule],
  exports: [SelectionBookListComponent],
})
export class SelectionBookListModule {}
