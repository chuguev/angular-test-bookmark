import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

/**
 * Список всех книг
 */
@Component({
  selector: 'bkmrk-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllBooksComponent implements OnInit {
  private books: any[] = [];

  @Input()
  set Books(v: any[]) {
    console.log(v);
    this.books = v;
  }

  get Books(): any[] {
    return this.books;
  }

  ngOnInit(): void {}

  public selectBook(book: any): void {
    this.books[0].selected = !this.books[0].selected;
    this.books = [...this.books];
  }

  public search(searchTerm: string): void {
    console.log(searchTerm);
  }
}
