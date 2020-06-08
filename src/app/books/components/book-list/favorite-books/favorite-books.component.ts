import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

/**
 * Список любимых книг
 */
@Component({
  selector: 'bkmrk-favorite-books',
  templateUrl: './favorite-books.component.html',
  styleUrls: ['./favorite-books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteBooksComponent implements OnInit {
  public books: any[] = [
    {
      id: 'id',
      title: 'title',
      selected: true,
    },
  ];
  ngOnInit(): void {}

  public selectBook(): void {
    this.books[0].selected = !this.books[0].selected;
    this.books = [...this.books];
  }

  public search(searchTerm: string): void {
    console.log(searchTerm);
  }
}
