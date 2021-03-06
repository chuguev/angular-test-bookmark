import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';

import { SelectionBook } from '../types/selection-book-list.type';

/**
 * Список книг с возможностью выбора
 */
@Component({
  selector: 'bkmrk-selection-book-list',
  templateUrl: './selection-book-list.component.html',
  styleUrls: ['./selection-book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionBookListComponent {
  private items: SelectionBook[] = [];

  @Output()
  Select: EventEmitter<SelectionBook> = new EventEmitter();

  @Input()
  set Books(v: SelectionBook[]) {
    this.items = v;
  }

  get Books(): SelectionBook[] {
    return this.items;
  }

  get IsEmptyList(): boolean {
    return this.isEmptyList();
  }

  public trackByBooks: TrackByFunction<SelectionBook> = (i: number, book: SelectionBook) => book.id;

  /**
   * Выбрать книгу
   */
  public selectBook(book: SelectionBook): void {
    book.selected = !book.selected;
    this.Select.emit(book);
  }

  /**
   * Проверка списка на пустоту
   */
  private isEmptyList(): boolean {
    return this.items.length === 0;
  }
}
