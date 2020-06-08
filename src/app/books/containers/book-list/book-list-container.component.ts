import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BooksService } from '../../services/books.service';
import { Observable } from 'rxjs';

/**
 * Контейнер списка книг
 */
@Component({
  selector: 'bkmrk-book-list-container',
  templateUrl: './book-list.container.html',
  styleUrls: ['./book-list.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListContainerComponent implements OnInit {
  private books$: Observable<any[]>;

  constructor(private booksService: BooksService) {}

  get Books$(): Observable<any[]> {
    return this.books$;
  }

  ngOnInit(): void {
    this.books$ = this.booksService.getBooks();

    this.books$.subscribe(d => console.log(d));
  }

  public uploadMore(): void {
    this.booksService.uploadMoreBooks();
  }
}
