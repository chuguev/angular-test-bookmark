import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Book } from '../../../services/books.type';
import { SelectionBook } from '../../../shared/selection-book-list/types/selection-book-list.type';

/**
 * Список всех книг
 */
@Component({
  selector: 'bkmrk-books-list-with-search',
  templateUrl: './books-list-with-search.component.html',
  styleUrls: ['./books-list-with-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListWithSearch {
  private books: Book[] = [];
  private selectionBooks: SelectionBook[] = [];
  private searchTerm = '';
  private isAllBooksUploads = true;
  private isLoading = true;

  @Output()
  public SwitchFavorite: EventEmitter<Book> = new EventEmitter<Book>();

  @Output()
  public UploadMore: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  set IsAllBooksUpload(v: boolean) {
    this.isAllBooksUploads = v;
  }

  @Input()
  set IsLoading(v: boolean) {
    this.isLoading = v;
  }

  get IsShowUploadMoreButton(): boolean {
    return !this.isAllBooksUploads && !this.isLoading;
  }

  @Input()
  set Books(v: Book[]) {
    this.books = v;
    this.selectionBooks = this.getSelectionBooksBySearchTerm();
  }

  get SelectionBooks(): SelectionBook[] {
    return this.selectionBooks;
  }

  /**
   * Поиск по списку книг
   * @param searchTerm - поисковой запрос
   */
  public search(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.selectionBooks = this.getSelectionBooksBySearchTerm();
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
   * Получить список выбираемых книг в зависимости от поискового запроса
   */
  private getSelectionBooksBySearchTerm(): SelectionBook[] {
    return this.mapBookToSelectionBooks(this.books).filter(book => book.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
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
