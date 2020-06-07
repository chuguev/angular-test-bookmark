import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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

  @Input()
  set Items(v: SelectionBook[]) {
    this.items = v;
  }

  get Items(): SelectionBook[] {
    return this.items;
  }

  get IsEmptyList(): boolean {
    return this.isEmptyList();
  }

  /**
   * Проверка списка на пустоту
   */
  private isEmptyList(): boolean {
    return this.items.length === 0;
  }
}
