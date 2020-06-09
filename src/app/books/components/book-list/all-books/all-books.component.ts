import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Book } from '../../../services/books.type';
import { SelectionBook } from '../../../shared/selection-book-list/types/selection-book-list.type';

/**
 * Список всех книг
 */
@Component({
  selector: 'bkmrk-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllBooksComponent {
  private books: Book[] = [];
  private selectionBooks: SelectionBook[] = [];
  private isAllBooksUploads: boolean;

  @Output()
  public Search: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public SwitchFavorite: EventEmitter<Book> = new EventEmitter<Book>();

  @Output()
  public UploadMore: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  set IsAllBooksUpload(v: boolean) {
    this.isAllBooksUploads = v;
  }

  get IsAllBooksUpload(): boolean {
    return this.isAllBooksUploads;
  }

  @Input()
  set Books(v: Book[]) {
    this.books = v;
    this.selectionBooks = this.mapBookToSelectionBooks(v);
  }

  get SelectionBooks(): SelectionBook[] {
    return this.selectionBooks;
  }

  /**
   * Поиск по списку книг
   * @param searchTerm - поисковой запрос
   */
  public search(searchTerm: string) {
    this.Search.emit(searchTerm);
  }

  /**
   * Переключение книги в избранное/из избранного
   * @param selectionBook - переключаемая книга
   */
  public switchFavorite(selectionBook: SelectionBook): void {
    const currentBook: Book = {
      ...this.books.find(book => book.id === selectionBook.id),
      favorite: selectionBook.selected,
    };
    this.SwitchFavorite.emit(currentBook);
  }

  /**
   * Преобразовать в список книг для компонента selection-book-list
   * @param books - список книг
   */
  private mapBookToSelectionBooks(books: Book[]): SelectionBook[] {
    return books.map(book => ({
      id: book.id,
      title: book.title,
      thumbnail: book.thumbnail,
      description: book.description,
      selected: book.favorite,
    }));
  }
}
