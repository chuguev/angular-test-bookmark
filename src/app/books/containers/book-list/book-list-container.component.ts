import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

/**
 * Контейнер списка книг
 */
@Component({
  selector: 'bkmrk-book-list-container',
  templateUrl: './book-list.container.html',
  styleUrls: ['./book-list.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListContainer implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
